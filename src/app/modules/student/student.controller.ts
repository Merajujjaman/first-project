import { Request, Response } from "express";
import { StudentServices } from "./student.service";

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;
    // will call service function and send tha data
    const result = await StudentServices.createSudentInDb(studentData);
    //well send response
    res.status(200).json({
      success: true,
      message: "student created successfully !!",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const getStudent = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getStudentFromDb();
    res.status(200).json({
      success: true,
      message: "student get data successfully !!",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const getSninglStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentFromDb(studentId);
    res.status(200).json({
      success: true,
      message: "student get single data successfully !!",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

export const StudentController = {
  createStudent,
  getStudent,
  getSninglStudent
};
