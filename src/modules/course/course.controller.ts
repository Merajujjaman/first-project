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
const updateCourse = catchAsync( async (req, res) => {
    const {id} = req.params
    const result = await courseServices.updateCourseIntoDb(id, req.body)
    sendResponse(res,{
        statusCode: httpStatus.OK,
        success: true,
        message: "Course is update successfully",
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
const assignFAcultiesWithCourse = catchAsync( async (req, res) => {
    const {courseId} = req.params
    const {faculties} = req.body
    const result = await courseServices.assignFacultiesWithCourseIntoDb(courseId, faculties)
    sendResponse(res,{
        statusCode: httpStatus.OK,
        success: true,
        message: "Faculties assign into the course successfully",
        data: result
    })
})
const removeFAcultiesFromCourse = catchAsync( async (req, res) => {
    const {courseId} = req.params
    const {faculties} = req.body
    const result = await courseServices.removeFacultiesFromCourseFromDb(courseId, faculties)
    sendResponse(res,{
        statusCode: httpStatus.OK,
        success: true,
        message: "Faculties remove from the course successfully",
        data: result
    })
})

export const courseControllers = {
    createCourse,
    getAllCourses,
    getSingleCourses,
    deleteCourse,
    updateCourse,
    assignFAcultiesWithCourse,
    removeFAcultiesFromCourse
}

