import express, { NextFunction, Request, Response } from "express";
import {  userControllers } from "./user.controller";
import { studentValidations } from "../student/student.validation";
import validateRequest from "../../middlewares/validateRequest";
import { createFacultyValidationSchema } from "../faculty/faculty.validation";
import { createAdminValidationSchema } from "../admin/admin.validation";
import auth from "../../middlewares/auth";
import { userRoles } from "./user.constant";
import { UserValidation } from "./user.validation";
import { upload } from "../../utils/sendImageToCloudinary";
const router = express.Router();

router.post(
  "/create-student",
  auth(userRoles.admin),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
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

router.post('/change-status/:id', auth('admin'), validateRequest(UserValidation.userStatusValidation), userControllers.changeUserStatus);

router.get( '/me', auth('admin', 'student', 'faculty'), userControllers.getMe );


export const userRouts = router;
