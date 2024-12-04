import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import { FacultyServices } from "./faculty.service";
import catchAsync from "../../utils/catchAsync";

const getSingleFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await FacultyServices.getSingleFacultyFromDb(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faculty is retrieved successfully",
    data: result,
  });
});

const getAllFaculties = catchAsync(async (req, res) => {
  const result = await FacultyServices.getAllFacultiesFromDb(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faculties are retrieved successfully",
    data: result,
  });
});

const updateFaculty = catchAsync(async(req, res) => {
    const {id} = req.params;
    const {faculty}= req.body
    const result = await FacultyServices.updateFacultyIntoDB(id, faculty)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Faculty updated successfully",
        data: result
    })
})

const deleteFaculty = catchAsync(async(req, res) => {
    const {id} = req.params;
    const result = await FacultyServices.deleteFacultyFromDb(id)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Faculty deleted successfully",
        data: result
    })
})

export const FacultyControllers = {
  getSingleFaculty,
  getAllFaculties,
  updateFaculty,
  deleteFaculty
};
