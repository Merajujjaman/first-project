import express from "express"
import validateRequest from "../../middlewares/validateRequest"
import { academicFacultyValidations } from "./academicFaculty.validation"
import { academicFacultyControllers } from "./academicFaculty.controller"
const router = express.Router()

router.post('/create-academic-faculty', validateRequest(academicFacultyValidations.createAcademicFacultyValidation), academicFacultyControllers.createAcademicFaculty)

router.get('/', academicFacultyControllers.getAllAcademicFaculty)

router.get('/:facultyId', academicFacultyControllers.getSingleAcademicFaculty)

export const academicFacultyRoutes = router