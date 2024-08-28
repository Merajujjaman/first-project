/* eslint-disable @typescript-eslint/no-explicit-any */
import { userServices } from "./user.service";
import status from "http-status";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";

const createStudent = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;

  // will call service function and send tha data
  const result = await userServices.createSudentDb(password, studentData);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Student is created succesfully",
    data: result,
  });
});

export const userController = {
  createStudent,
};
