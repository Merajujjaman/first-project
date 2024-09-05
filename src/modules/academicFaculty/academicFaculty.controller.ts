import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { academicFacultyServices } from "./academicFaculty.service";

const createAcademicFaculty = catchAsync(async(req, res) =>{
    const result = await academicFacultyServices.createAcademicFacultyDB(req.body)
    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: "Academic faculty is created succesfully",
        data: result,
      });
})

const getAllAcademicFaculty = catchAsync(async(req, res) => {
    const result = await academicFacultyServices.getAllAcademicFacultyDB()
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Academic faculties are retrieved successfully',
      data: result
    })
  })
  const getSingleAcademicFaculty = catchAsync(async(req, res) => {
    const {facultyId} = req.params
    const result = await academicFacultyServices.getSingleAcademicFacultyDB(facultyId)
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Academic faculty is retrieved successfully',
      data: result
    })
  })

  export const academicFacultyControllers = {
    createAcademicFaculty,
    getAllAcademicFaculty,
    getSingleAcademicFaculty
  }