import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { academicDepartmeServices } from "./academicDepartment.service";

const createAcademicDepartment = catchAsync(async (req, res) => {
  const result = await academicDepartmeServices.createAcademicDepartmentDB(
    req.body
  );
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Academic department is created succesfully",
    data: result,
  });
});

const getAllAcademicDepartment = catchAsync(async (req, res) => {
  const result = await academicDepartmeServices.getAllAcademicDepartmentDB();
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Academic departments are retrieved successfully",
    data: result,
  });
});
const getSingleAcademicDepartment = catchAsync(async (req, res) => {
  const { academicId } = req.params;
  const result =
    await academicDepartmeServices.getSingleAcademicDepartmentDB(academicId);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Academic department is retrieved successfully",
    data: result,
  });
});
const updateAcademicDepartment = catchAsync(async (req, res) => {
  const { academicId } = req.params;
  const updateData = req.body
  const result =
    await academicDepartmeServices.updateAcademicDepartmentDB(academicId, updateData);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Academic department is retrieved successfully",
    data: result,
  });
});

export const academicDepartmentControllers = {
  createAcademicDepartment,
  getAllAcademicDepartment,
  getSingleAcademicDepartment,
  updateAcademicDepartment
};
