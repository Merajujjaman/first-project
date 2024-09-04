import { isValidObjectId } from "mongoose";
import { MapAcademicNameCode } from "./academicSemester.constant";
import { TAcademicSemester } from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.model";

const createAccademicSemesterDB = async (payload: TAcademicSemester) => {
  if (MapAcademicNameCode[payload.name] !== payload.code) {
    throw new Error("Semester code does not match");
  }

  const result = await AcademicSemester.create(payload);
  return result;
};

const getAllAcademicSemesterDB = async() => {
  const result = await AcademicSemester.find()
  return result
}
const getSingleAcademicSemesterDB = async(id: string) => {
  if(!isValidObjectId(id)){
    throw new Error(`${id} is not a correct Object ID`)
  }
  const result = await AcademicSemester.findById(id)
  return result
}

export const academicSemesterServices = {
  createAccademicSemesterDB,
  getAllAcademicSemesterDB,
  getSingleAcademicSemesterDB
};
