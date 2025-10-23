import express from "express";
import { StudentController } from "./student.controller";
import validateRequest from "../../middlewares/validateRequest";
import { studentValidations } from "./student.validation";
import auth from "../../middlewares/auth";

const router = express.Router()

// will call controller function
router.get("/", StudentController.getStudent )
router.get("/:id", auth('admin', 'faculty'), StudentController.getSingleStudent ) 
router.delete("/:id", StudentController.deleteStudent ) 
router.patch("/:id", validateRequest(studentValidations.updateStudentValidationSchema), StudentController.updateStudent ) 

export const studentRouts = router;