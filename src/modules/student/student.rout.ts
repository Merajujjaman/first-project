import express from "express";
import { StudentController } from "./student.controller";

const router = express.Router()

// will call controller function
router.get("/", StudentController.getStudent )
router.get("/:studentId", StudentController.getSninglStudent ) 
router.delete("/:studentId", StudentController.deleteStudent ) 

export const studentRouts = router;