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

const getAllAcademicSemester = catchAsync(async(req, res) => {
  const result = await academicSemesterServices.getAllAcademicSemesterDB()
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Academic semesters are retrieved successfully',
    data: result
  })
})
const getSingleAcademicSemester = catchAsync(async(req, res) => {
  const {semesterId} = req.params
  const result = await academicSemesterServices.getSingleAcademicSemesterDB(semesterId)
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Academic semester are retrieved successfully',
    data: result
  })
})

export const academicSemesterControllers = {
  createAccademicSemester,
  getAllAcademicSemester,
  getSingleAcademicSemester
};
