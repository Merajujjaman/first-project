import express from "express"
import { academicSemesterControllers } from "./academicSemester.controller";
const router = express.Router()
router.post('/create-academic-semester', academicSemesterControllers.createAccademicSemester)
router.get('/', academicSemesterControllers.getAllAcademicSemester)
router.get('/:semesterId', academicSemesterControllers.getSingleAcademicSemester)

export const academicSemesterRouts = router;
