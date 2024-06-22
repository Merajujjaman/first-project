// import { Schema, model, connect } from "mongoose";

import { Model } from "mongoose";

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
  password: string;
  name: TUserName;
  email: string;
  dateOfBirth?: string;
  gender: "male" | "female" | "others";
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup: "A+" | "A-" | "B+" | "B-" | "O+" | "O-" | "AB+" | "AB-";
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profileImg?: string;
  isActive: "active" | "blocked";
  isDeleted?: boolean
};

//creare custom instance methodes
// export type StudentMethodes = {
//   isUserExist(id: string): Promise<TStudent | null>
// }
// export type StudentModel = Model<TStudent, {}, StudentMethodes>;
//------------------------------

//create custom static methodes
export interface StudentModel extends Model<TStudent> {
  isUserExist(id: string): Promise<TStudent | null>
}
