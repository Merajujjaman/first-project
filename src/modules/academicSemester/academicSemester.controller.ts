/* eslint-disable @typescript-eslint/no-explicit-any */
import status from "http-status";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { academicSemesterServices } from "./academicSemester.service";

const createAccademicSemester = catchAsync(async (req, res) => {
  //const { password, student: studentData } = req.body;

  // will call service function and send tha data
  const result = await academicSemesterServices.createAccademicSemesterDB(req.body)
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Academic semester is created succesfully",
    data: result,
  });
});

export const academicSemesterControllers = {
  createAccademicSemester
};
