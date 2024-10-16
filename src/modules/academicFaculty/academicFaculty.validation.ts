import { z } from "zod";

const createAcademicFacultyValidation = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic faculty must be string',
      required_error: 'Academic faculty is required'
    }),
  })
});

const updateAcademicFacultyValidation = z.object({
  body: z.object({
    name: z.string(),
  })
});

export const academicFacultyValidations = {
  createAcademicFacultyValidation,
  updateAcademicFacultyValidation,
};
