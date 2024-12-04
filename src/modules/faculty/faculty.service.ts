/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { FacultySearchableFields } from "./faculty.constant";
import { TFaculty } from "./faculty.interface";
import { Faculty } from "./faculty.model";
import { User } from "../user/user.model";
import mongoose from "mongoose";

const getSingleFacultyFromDb = async (id: string) => {
  const result = await Faculty.findOne({ id }).populate({
    path: "academicDepartment",
    populate: {
      path: "academicFaculty",
    },
  });
  if(!result){
    throw new AppError(httpStatus.NOT_FOUND, `Faculty not Found for this (${id}) Id`)
  }
  return result;
};

// get all faculty
const getAllFacultiesFromDb = async (query: Record<string, unknown>) => {
  const facultyQuery = new QueryBuilder(
    Faculty.find().populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    }),
    query
  )
    .search(FacultySearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await facultyQuery.modelQuery;
  return result;
};

//update faculty
const updateFacultyIntoDB = async (id: string, payload: Partial<TFaculty>) => {
  const { name, ...remainingFacultyData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingFacultyData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  const result = await Faculty.findOneAndUpdate({id}, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

//delete faculty and user
const deleteFacultyFromDb = async(id: string) => {
    const session = await mongoose.startSession()
    try {
        session.startTransaction()
        const deleteFaculty = await Faculty.findOneAndUpdate({id}, {isDeleted: true}, {new: true, session})
        if(!deleteFaculty){
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete faculty')
        }

        //get user _id from Faculty collection:
        const userId = deleteFaculty?.user
        const deleteUser = await User.findByIdAndUpdate(userId, {isDeleted: true}, {new: true, session})
        if(!deleteUser){
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user')
        }

        await session.commitTransaction()
        await session.endSession()
    } catch (error: any) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error(error)   
    }
}

export const FacultyServices = {
  getSingleFacultyFromDb,
  getAllFacultiesFromDb,
  updateFacultyIntoDB,
  deleteFacultyFromDb
};
