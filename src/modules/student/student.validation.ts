import { z } from "zod";

const CreateUserNameValidationSchema = z.object({
  firstName: z
    .string()
    .max(20, { message: "First name cannot be more than 20 characters" })
    .min(1, { message: "First name is required" }),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .max(10, { message: "First name cannot be more than 10 characters" })
    .min(1, { message: "Last name is required" })
});

// Define the validation schema for Guardian
const createGuardianValidationSchema = z.object({
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
const createLocalGuardianValidationSchema = z.object({
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
const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20).optional(),
    student: z.object({
      name: CreateUserNameValidationSchema,
      gender: z.enum(['male', 'female', 'other']),
      dateOfBirth: z.string().optional(),
      email: z.string().email(),
      contactNo: z.string(),
      emergencyContactNo: z.string(),
      bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']).optional(),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      guardian: createGuardianValidationSchema,
      localGuardian: createLocalGuardianValidationSchema,
      profileImg: z.string(),
      academicDepartment: z.string(),
      admissionSemester: z.string()
    }),
  }),
});



// Separate schemas for reusable components
const UpdateUserNameValidationSchema = z.object({
  firstName: z.string().optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
});

const UpdateGuardianValidationSchema = z.object({
  fatherName: z.string().optional(),
  fatherOccupation: z.string().optional(),
  fatherContactNo: z.string().optional(),
  motherName: z.string().optional(),
  motherOccupation: z.string().optional(),
  motherContactNo: z.string().optional(),
});

const UpdateLocalGuardianValidationSchema = z.object({
  name: z.string().optional(),
  occupation: z.string().optional(),
  contactNo: z.string().optional(),
  address: z.string().optional(),
});

// Update student schema
const updateStudentValidationSchema = z.object({
  body: z.object({
    student: z.object({
      name: UpdateUserNameValidationSchema.optional(),
      gender: z.enum(['male', 'female', 'other']).optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().email().optional(),
      contactNo: z.string().optional(),
      emergencyContactNo: z.string().optional(),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),
      guardian: UpdateGuardianValidationSchema.optional(),
      localGuardian: UpdateLocalGuardianValidationSchema.optional(),
      profileImg: z.string().optional(),
      academicDepartment: z.string().optional(),
      admissionSemester: z.string().optional(),
    }).partial(),
  }),
});

export const studentValidations = {
  createStudentValidationSchema,
  updateStudentValidationSchema,
};


