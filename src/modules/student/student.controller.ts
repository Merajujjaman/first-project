/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { StudentServices } from "./student.service";



const getStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await StudentServices.getStudentFromDb();
    res.status(200).json({
      success: true,
      message: "student get data successfully !!",
      data: result,
    });
  } catch (error: any) {
    next(error)
  }
};

const getSninglStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentFromDb(studentId);
    res.status(200).json({
      success: true,
      message: "student get single data successfully !!",
      data: result,
    });
  } catch (error : any) {
    next(error)
  }
};

const deleteStudent = async (req: Request, res: Response, next: NextFunction) => {
  try{
    const {studentId} = req.params;
    const result = await StudentServices.deleteStudentFromDb(studentId);
    res.status(200).json({
      success: true,
      message: "student data deleted successfully !!",
      data: result,
    });

  }catch(error: any){
    next(error)
  }
}

export const StudentController = {
  getStudent,
  getSninglStudent,
  deleteStudent
};
