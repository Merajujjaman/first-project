import express from "express";
import {  userControllers } from "./user.controller";
import { studentValidations } from "../student/student.validation";
import validateRequest from "../../middlewares/validateRequest";
import { createFacultyValidationSchema } from "../faculty/faculty.validation";
import { createAdminValidationSchema } from "../admin/admin.validation";
import auth from "../../middlewares/auth";
import { userRoles } from "./user.constant";
const router = express.Router();

router.post(
  "/create-student",
  auth(userRoles.admin),
  validateRequest(studentValidations.createStudentValidationSchema),
  userControllers.createStudent
);

router.post(
  '/create-faculty',
  auth(userRoles.admin),
  validateRequest(createFacultyValidationSchema),
  userControllers.createFaculty,
);

router.post(
  '/create-admin',
  validateRequest(createAdminValidationSchema),
  userControllers.createAdmin,
);


export const userRouts = router;
