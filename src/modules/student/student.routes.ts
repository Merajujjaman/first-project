import express from "express";
import { StudentController } from "./student.controller";
import validateRequest from "../../middlewares/validateRequest";
import { studentValidations } from "./student.validation";

const router = express.Router()

// will call controller function
router.get("/", StudentController.getStudent )
router.get("/:id", StudentController.getSingleStudent ) 
router.delete("/:id", StudentController.deleteStudent ) 
router.patch("/:id", validateRequest(studentValidations.updateStudentValidationSchema), StudentController.updateStudent ) 

export const studentRouts = router;