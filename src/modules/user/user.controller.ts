/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { userServices } from "./user.service";
import status from "http-status"
import sendResponse from "../../utils/sendResponse";

const createStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { password, student: studentData } = req.body;

    //   const zodParseData = studentValidationSchema.parse(studentData)

    // will call service function and send tha data
    const result = await userServices.createSudentDb(password, studentData);
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Student is created succesfully',
      data: result,
    });
    
  } catch (error: any) {
    next(error)
  }
};

export const userController = {
  createStudent,
};
