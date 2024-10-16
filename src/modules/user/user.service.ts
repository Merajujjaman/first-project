import mongoose from "mongoose";
import config from "../../config";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { generateId } from "./user.utils";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const createStudentDb = async (password: string, studentData: TStudent) => {
  //create a user object:
  const newUserData: Partial<TUser> = {};

  //if password is not given user default password
  newUserData.password = password || (config.default_password as string);
  //set student role
  newUserData.role = "student";

  // get semester data from db
  const admissionSemester = await AcademicSemester.findById(
    studentData.admissionSemester
  );

  //set manually generated it
  newUserData.id = await generateId(admissionSemester!);
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    const result = await User.create([newUserData], {session});
  if (!result.length) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user')
  }
  studentData.id = result[0].id;
  studentData.user = result[0]._id;

  const newStudent = await Student.create([studentData], {session});
  if (!newStudent.length) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create new student')
  }

 await session.commitTransaction()
 await session.endSession()
  return newStudent;
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()

    throw new AppError(httpStatus.BAD_REQUEST, `Transaction error ${error}`)
    
  }
  
};

export const userServices = {
  createStudentDb: createStudentDb,
};
