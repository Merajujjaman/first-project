/* eslint-disable @typescript-eslint/no-explicit-any */
import { StudentServices } from "./student.service";
import catchAsync from "../../utils/catchAsync";



const getStudent = catchAsync(async (req, res) => {
  const result = await StudentServices.getStudentFromDb();
  res.status(200).json({
    success: true,
    message: "student get data successfully !!",
    data: result,
  });
});

const getSninglStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentServices.getSingleStudentFromDb(studentId);
  res.status(200).json({
    success: true,
    message: "student get single data successfully !!",
    data: result,
  });
});

const deleteStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentServices.deleteStudentFromDb(studentId);
  res.status(200).json({
    success: true,
    message: "student data deleted successfully !!",
    data: result,
  });
});

export const StudentController = {
  getStudent,
  getSninglStudent,
  deleteStudent,
};
