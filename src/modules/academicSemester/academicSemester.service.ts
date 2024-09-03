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

export const academicSemesterServices = {
  createAccademicSemesterDB,
};
