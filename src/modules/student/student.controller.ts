/* eslint-disable @typescript-eslint/no-explicit-any */
import { StudentServices } from "./student.service";
import catchAsync from "../../utils/catchAsync";



const getStudent = catchAsync(async (req, res) => {
  const result = await StudentServices.getAllStudentFromDb();
  res.status(200).json({
    success: true,
    message: "student get data successfully !!",
    data: result,
  });
});

const getSingleStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentServices.getSingleStudentFromDb(studentId);
  res.status(200).json({
    success: true,
    message: "student get single data successfully !!",
    data: result,
  });
});
const updateStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const {student} = req.body
  const result = await StudentServices.updateStudentToDb(studentId, student);
  res.status(200).json({
    success: true,
    message: "student update successfully !!",
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
  getSingleStudent,
  deleteStudent,
  updateStudent
};
