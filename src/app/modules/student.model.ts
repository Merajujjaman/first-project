import { Schema, model} from "mongoose";
import {
  Guardian,
  LocalGuardian,
  Student,
  UserName,
} from "./student/student.interface";

const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: true,
  },
});

const guardianSchema = new Schema<Guardian>({
  fathterName: { type: String },
  fatherOccupation: { type: String, required: true },
  fatherContactNo: { type: String },
  motherName: { type: String, required: true },
  motherOccupation: { type: String, required: true },
  motherContactNo: { type: String, required: true },
});

const localGuardianSchema = new Schema<LocalGuardian>({
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  contactNo: { type: String, required: true },
  address: { type: String, required: true },
});

const studentSchema = new Schema<Student>({
  id: { type: String },
  name: userNameSchema,
  email: { type: String, required: true },
  dateOfBirth: { type: String },
  gender: ["male", "female"],
  emergencyContactNo: { type: String, required: true },
  contactNo: { type: String, required: true },
  boldGroup: ["A+", "A-", "AB+", "AB-", "B+", "B-", "O+", "O-"],
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: guardianSchema,
  localGuardian: localGuardianSchema,
  profileImg: { type: String },
  isActive: ["active", "blocked"],
});

// const User = model<IUser>('User', userSchema);

export const StudentModel = model<Student>("Student", studentSchema)
