/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import mongoose from "mongoose";
import { Student } from "./student.model";
import { User } from "../user/user.model";
import AppError from "../../errors/AppError";
import { TStudent } from "./student.interface";
import QueryBuilder from "../../builder/QueryBuilder";
import { studentSearchAbleFields } from "./student.const";

const getAllStudentFromDb = async (query: Record<string, unknown>) => {
  //const queryObject = {...query}

  //searching
  // let searchTerm = ""
  // if(query.searchTerm){
  //     searchTerm = query?.searchTerm as string ;
  // }

  // const studentSearchAbleFields = ['email', 'name.firstName']

  // const searchQuery = Student.find({
  //     $or: studentSearchAbleFields.map((field) => ({[field]: { $regex: searchTerm, $options: 'i' }}))
  // })

  //filtering
  //   const excludeFields = ["searchTerm", "sort", "limit", "page", "fields"];
  //   excludeFields.forEach((element) => delete queryObject[element]);
  //   const filterQuery = searchQuery
  //     .find(queryObject)
  //     .populate("admissionSemester")
  //     .populate({
  //       path: "academicDepartment",
  //       populate: {
  //         path: "academicFaculty",
  //       },
  //     });

  //sorting
  // let sort ="-createdAt"
  // if(query.sort){
  //     sort = query.sort as string
  // }
  // const sortQuery = filterQuery.sort(sort)

  //limiting
  // let limit = 1;
  // let page = 1;
  // let skip = 0;
  // if(query.limit){
  //     limit = Number(query.limit)
  // }

  // if(query.page){
  //     page = Number(query.page)
  //     skip = (page-1)*limit
  // }
  // const paginateQuery = sortQuery.skip(skip)
  // const limitQuery = paginateQuery.limit(limit)

  // let fields = '-__v'
  // if(query.fields){
  //     fields = (query.fields as string).split(',').join(' ')
  // }
  // const fieldsQuery = limitQuery.select(fields)
  // return fieldsQuery ;

  /* using query builder for more optimize code */
  const studentQuery = new QueryBuilder(
    Student.find()
      .populate("admissionSemester")
      .populate({
        path: "academicDepartment",
        populate: {
          path: "academicFaculty",
        },
      }),
    query
  )
    .search(studentSearchAbleFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await studentQuery.modelQuery;
  return result;
};

const getSingleStudentFromDb = async (id: string) => {
  // const result = await Student.findOne({id})
  const result = await Student.findById(id)
    .populate("admissionSemester")
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Student not found");
  }
  return result;
};
const updateStudentToDb = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...rest } = payload;
  const modifiedData: Record<string, unknown> = {
    ...rest,
  };

  if (name && Object.keys(name).length) {
    for (const [keys, value] of Object.entries(name)) {
      modifiedData[`name.${keys}`] = value;
    }
  }
  if (guardian && Object.keys(guardian).length) {
    for (const [keys, value] of Object.entries(guardian)) {
      modifiedData[`guardian.${keys}`] = value;
    }
  }
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [keys, value] of Object.entries(localGuardian)) {
      modifiedData[`localGuardian.${keys}`] = value;
    }
  }

  const result = await Student.findByIdAndUpdate( id , modifiedData, {
    new: true,
    runValidators: true,
  });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Student not found");
  }
  return result;
};

const deleteStudentFromDb = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deleteStudent = await Student.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session }
    );

    if (!deleteStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete Student");
    }

    //get user _id:
    const userId = deleteStudent?.user
    const deletedUser = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session }
    );
    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete User");
    }
    
    await session.commitTransaction();
    await session.endSession();
    return deleteStudent;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

export const StudentServices = {
  getAllStudentFromDb,
  getSingleStudentFromDb,
  deleteStudentFromDb,
  updateStudentToDb,
};
