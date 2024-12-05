import catchAsync from "../../utils/catchAsync";
import { courseServices } from "./course.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const createCourse = catchAsync( async (req, res) => {
    const result = await courseServices.createCourseIntoDb(req.body)
    sendResponse(res,{
        statusCode: httpStatus.OK,
        success: true,
        message: "Course is created successfully",
        data: result
    })
})
const getAllCourses = catchAsync( async (req, res) => {
    const result = await courseServices.getAllCoursesFromDb(req.query)
    sendResponse(res,{
        statusCode: httpStatus.OK,
        success: true,
        message: "Courses are retrieved successfully",
        data: result
    })
})
const getSingleCourses = catchAsync( async (req, res) => {
    const {id} = req.params
    const result = await courseServices.getSingleCourseFromDb(id)
    sendResponse(res,{
        statusCode: httpStatus.OK,
        success: true,
        message: "Course is retrieved successfully",
        data: result
    })
})
const deleteCourse = catchAsync( async (req, res) => {
    const {id} = req.params
    const result = await courseServices.deleteCourseFromDb(id)
    sendResponse(res,{
        statusCode: httpStatus.OK,
        success: true,
        message: "Course is deleted successfully",
        data: result
    })
})

export const courseControllers = {
    createCourse,
    getAllCourses,
    getSingleCourses,
    deleteCourse
}

