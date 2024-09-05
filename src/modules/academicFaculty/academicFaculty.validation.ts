import { z } from "zod";

const createAcademicFacultyValidation = z.object({
  body: z.object({
    name: z.string(),
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
