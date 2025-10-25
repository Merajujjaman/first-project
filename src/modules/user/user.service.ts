/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import config from "../../config";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { generateAdminId, generateFacultyId, generateId } from "./user.utils";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { TFaculty } from "../faculty/faculty.interface";
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model";
import { Faculty } from "../faculty/faculty.model";
import { Admin } from "../admin/admin.model";
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";

const createStudentDb = async (file: any,password: string, studentData: TStudent) => {
  //create a user object:
  const newUserData: Partial<TUser> = {};

  //if password is not given user default password
  newUserData.password = password || (config.default_password as string);
  //set student role
  newUserData.role = "student";
  //set Email
  newUserData.email = studentData.email;

  // get semester data from db
  const admissionSemester = await AcademicSemester.findById(
    studentData.admissionSemester
  );

  //set manually generated it
  newUserData.id = await generateId(admissionSemester!);
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    // Upload image to cloudinary
    const imagePath = file?.path;
    const imageName = `${newUserData.id}-${studentData.name.firstName}`;
    const { secure_url } = await sendImageToCloudinary(imageName, imagePath) as any;

    //create a user
    const result = await User.create([newUserData], { session });
    if (!result.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user");
    }
    studentData.id = result[0].id;
    studentData.user = result[0]._id;
    studentData.profileImg = secure_url;

    const newStudent = await Student.create([studentData], { session });
    if (!newStudent.length) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Failed to create new student"
      );
    }

    await session.commitTransaction();
    await session.endSession();
    return newStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();

    throw new AppError(httpStatus.BAD_REQUEST, `Transaction error ${error}`);
  }
};

//create faculty
const createFacultyIntoDB = async (password: string, payload: TFaculty) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use default password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = "faculty";
  //set Email
  userData.email = payload.email;

  // find academic department info
  const academicDepartment = await AcademicDepartment.findById(
    payload.academicDepartment
  );

  if (!academicDepartment) {
    throw new AppError(400, "Academic department not found");
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateFacultyId();

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session }); // array

    //create a faculty
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user");
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a faculty (transaction-2)

    const newFaculty = await Faculty.create([payload], { session });

    if (!newFaculty.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create faculty");
    }

    await session.commitTransaction();
    await session.endSession();

    return newFaculty;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

//Create admin and user:
const createAdminIntoDB = async (password: string, payload: TFaculty) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use default password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = "admin";
  //set Email
  userData.email = payload.email;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateAdminId();

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session });

    //create a admin
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user");
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a admin (transaction-2)
    const newAdmin = await Admin.create([payload], { session });

    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create admin");
    }

    await session.commitTransaction();
    await session.endSession();

    return newAdmin;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

//getMe service:
const getMe = async (userId: string, role:string) => {
  
  let result = null;
  if (role === "student") {
    result = await Student.findOne({ id: userId })
      .populate("admissionSemester")
      .populate({
        path: "academicDepartment",
        populate: {
          path: "academicFaculty",
        },
      });
  }
  if (role === "faculty") {
    result = await Faculty.findOne({ id: userId });
  }
  if (role === "admin") {
    result = await Admin.findOne({ id: userId });
  }

  return result;
};

//change user status service
const changeUserStatus = async (id: string, payload: {status: string}) => {
  const result = await User.findByIdAndUpdate(id , payload,{ new: true });
  return result
}

export const userServices = {
  createStudentDb,
  createFacultyIntoDB,
  createAdminIntoDB,
  getMe,
  changeUserStatus
};

