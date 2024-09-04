import config from "../../config";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { generateId } from "./user.utils";

const createSudentDb = async (password: string, studentData: TStudent) => {
  //create a user object:
  const newUserData: Partial<TUser> = {};

  //if password is not given user default password
  newUserData.password = password || (config.default_password as string);
  //set student role
  newUserData.role = "student";

  // get semester data from db
  const admissionSemester = await AcademicSemester.findById(
    studentData.admissionSemester
  );

  //set manually generated it
  newUserData.id = await generateId(admissionSemester!);

  const result = await User.create(newUserData);
  if (Object.keys(result).length) {
    studentData.id = result.id;
    studentData.user = result._id;
  }

  const newStudent = await Student.create(studentData);
  return newStudent;
};

export const userServices = {
  createSudentDb,
};
