import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { semesterRegistrationServices } from "./semesterRegistration.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const createSemesterRegistration = catchAsync( async (req: Request, res: Response) => {
    const result = await semesterRegistrationServices.createSemesterRegistrationIntoDb(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Semester Registration is created successfully!',
        data: result,
      });
})
const getAllSemesterRegistrations = catchAsync( async (req: Request, res: Response) => {
    const result = await semesterRegistrationServices.getAllSemesterRegistrationsFromDb(req.query);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Semester Registrations are retrieved successfully!',
        data: result,
      });
})
const getSingleRegistration = catchAsync( async (req: Request, res: Response) => {
    const {id} = req.params;
    const result = await semesterRegistrationServices.getSingleRegistrationFromDb(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Semester Registration is retrieved successfully!',
        data: result,
      });
})

const updateSemesterRegistration = catchAsync(
    async (req: Request, res: Response) => {
      const { id } = req.params;
      const result =
        await semesterRegistrationServices.updateSemesterRegistrationIntoDB(
          id,
          req.body,
        );
  
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Semester Registration is updated successfully',
        data: result,
      });
    },
  );

export const semesterRegistrationControllers = {
    createSemesterRegistration,
    getAllSemesterRegistrations,
    getSingleRegistration,
    updateSemesterRegistration
}