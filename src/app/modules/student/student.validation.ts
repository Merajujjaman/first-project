import { z } from "zod";

const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .max(10, { message: "First name cannot be more than 10 characters" })
    .min(1, { message: "First name is required" }),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .min(1, { message: "Last name is required" })
});

// Define the validation schema for Guardian
const guardianValidationSchema = z.object({
  fatherName: z.string().min(1, { message: "Father's occupation is required" }),
  fatherOccupation: z
    .string()
    .min(1, { message: "Father's occupation is required" }),
  fatherContactNo: z.string().optional(),
  motherName: z.string().min(1, { message: "Mother's name is required" }),
  motherOccupation: z
    .string()
    .min(1, { message: "Mother's occupation is required" }),
  motherContactNo: z
    .string()
    .min(1, { message: "Mother's contact number is required" }),
});

// Define the validation schema for LocalGuardian
const localGuardianValidationSchema = z.object({
  name: z.string().min(1, { message: "Local guardian's name is required" }),
  occupation: z
    .string()
    .min(1, { message: "Local guardian's occupation is required" }),
  contactNo: z
    .string()
    .min(1, { message: "Local guardian's contact number is required" }),
  address: z
    .string()
    .min(1, { message: "Local guardian's address is required" }),
});

// Define the validation schema for Student
const studentValidationSchema = z.object({
  id: z.string().min(1, { message: "ID is required" }),
  password: z.string().min(1, { message: "password is required" }),
  name: userNameValidationSchema,
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .min(1, { message: "Email is required" }),
  dateOfBirth: z.string().optional(),
  gender: z.enum(["male", "female", "others"], { message: "Invalid gender" }),
  emergencyContactNo: z
    .string()
    .min(1, { message: "Emergency contact number is required" }),
  contactNo: z.string().min(1, { message: "Contact number is required" }),
  bloodGroup: z.enum(["A+", "A-", "AB+", "AB-", "B+", "B-", "O+", "O-"], {
    message: "Invalid blood group",
  }),
  presentAddress: z.string().min(1, { message: "Present address is required" }),
  permanentAddress: z
    .string()
    .min(1, { message: "Permanent address is required" }),
  guardian: guardianValidationSchema,
  localGuardian: localGuardianValidationSchema,
  profileImg: z.string().optional(),
  isActive: z.enum(["active", "blocked"]).default("active"),
  isDeleted: z.boolean().optional()
});

export default studentValidationSchema;
