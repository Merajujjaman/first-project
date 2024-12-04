/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { AdminSearchableFields } from "./admin.constant";
import { Admin } from "./admin.model";
import { TAdmin } from "./admin.interface";
import { User } from "../user/user.model";
import mongoose from "mongoose";

// get all admins:
const getAllAdminsFromDb = async (query: Record<string, unknown>) => {
  const adminQuery = new QueryBuilder(Admin.find(), query)
    .search(AdminSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await adminQuery.modelQuery;
  return result;
};
// get single admin:
const getSingleAdminFromDb = async (id: string) => {
  const result = await Admin.findById(id);
  if (!result) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `There in no Admin for this ${id} ID`
    );
  }
  return result;
};

//update admin:
const updateAdminIntoDB = async (id: string, payload: Partial<TAdmin>) => {
  const { name, ...remainingAdminData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingAdminData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  const result = await Admin.findByIdAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  if(!result){
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update')
  }
  return result;
};

//delete admin:
const deleteAdminFromDb = async (id: string) => {
    const session = await mongoose.startSession()
    try {
        session.startTransaction()
        // delete from admin collection
        const deleteAdmin = await Admin.findByIdAndUpdate(id, {isDeleted: true}, { new: true, session})
        if(!deleteAdmin){
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Admin')
        }
        // get user _id:
        const userId = deleteAdmin?.user

        // delete form user collection
        const deleteUser = await User.findByIdAndUpdate(userId, {isDeleted: true}, {new: true, session})
        if(!deleteUser){
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete User')
        }

        await session.commitTransaction()
        await session.endSession()
        return deleteAdmin
    } catch (error: any) {
        await session.abortTransaction()
        await session.endSession()
        throw new Error(error)
        
    }
}
export const adminServices = {
  getAllAdminsFromDb,
  getSingleAdminFromDb,
  updateAdminIntoDB,
  deleteAdminFromDb
};
