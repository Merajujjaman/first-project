// import { Schema, model, connect } from "mongoose";

import { Model, Types } from "mongoose";

export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo?: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type TUserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type TStudent = {
  id: string;
  user: Types.ObjectId;
  password: string;
  name: TUserName;
  gender: "male" | "female" | "other";
  dateOfBirth?: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profileImg?: string;
  admissionSemester: Types.ObjectId;
  academicDepartment: Types.ObjectId;
  isDeleted: boolean;
};

//create custom instance methods
// export type StudentMethods = {
//   isUserExist(id: string): Promise<TStudent | null>
// }
// export type StudentModel = Model<TStudent, {}, StudentMethods>;
//------------------------------

//create custom static methods
export interface StudentModel extends Model<TStudent> {
  isUserExist(id: string): Promise<TStudent | null>;
}
