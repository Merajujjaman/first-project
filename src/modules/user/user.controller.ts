/* eslint-disable @typescript-eslint/no-explicit-any */
import { userServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import httpStatus from "http-status";

const createStudent = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;
  // will call service function and send tha data
  const result = await userServices.createStudentDb(req.file,password, studentData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student is created successfully",
    data: result,
  });
});

const createFaculty = catchAsync(async (req, res) => {
  const { password, faculty: facultyData } = req.body;

  const result = await userServices.createFacultyIntoDB(password, facultyData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty is created successfully',
    data: result,
  });
});

//create admin user:
const createAdmin = catchAsync(async (req, res) => {
  const { password, admin: adminData } = req.body;

  const result = await userServices.createAdminIntoDB(password, adminData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is created successfully',
    data: result,
  });
});

// getMe controller:
const getMe = catchAsync(async (req, res) => {

  const {userId, role} = req.user as {userId: string, role: string};
  const result = await userServices.getMe(userId, role);
  
   sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'retrieved user info successfully',
    data: result,
  });
})

//change user status controller:
const changeUserStatus = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await userServices.changeUserStatus(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User status changed successfully',
    data: result,
  });
})
export const userControllers = {
  createStudent,
  createFaculty,
  createAdmin,
  getMe,
  changeUserStatus,
};
