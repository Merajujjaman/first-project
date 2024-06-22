import { Request, Response } from "express";
import { StudentServices } from "./student.service";
import studentValidationSchema from "./student.validation";

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;

    /* this is joi validation 
    const {error, value} = studentSchema.validate(studentData)
    console.log({error}, {value}); */

    // data validation using zod: 
    const zodParseData = studentValidationSchema.parse(studentData)

    
    // will call service function and send tha data
    const result = await StudentServices.createSudentInDb(zodParseData);
    //well send response
    res.status(200).json({
      success: true,
      message: "student created successfully !!",
      data: result,
    });
  } catch (error : any) {
    // console.log(error);
    res.status(500).json({
      success: false,
      message: error.message ||"Something went wrong !!",
      error: error,
    });
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
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message ||"Something went wrong !!",
      error: error,
    });
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
  } catch (error : any) {
    res.status(500).json({
      success: false,
      message: error.message ||"Something went wrong !!",
      error: error,
    });
  }
};

const deleteStudent = async (req: Request, res: Response) => {
  try{
    const {studentId} = req.params;
    const result = await StudentServices.deleteStudentFromDb(studentId);
    res.status(200).json({
      success: true,
      message: "student data deleted successfully !!",
      data: result,
    });

  }catch(error: any){
    res.status(500).json({
      success: false,
      message: error.message ||"Something went wrong !!",
      error: error,
    });
  }
}

export const StudentController = {
  createStudent,
  getStudent,
  getSninglStudent,
  deleteStudent
};
