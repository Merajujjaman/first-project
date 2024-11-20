import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { academicDepartmentValidations } from './academicDepartment.validation'
import { academicDepartmentControllers } from './academicDepartment.controller'

const router = express.Router()

router.post('/create-academic-department', 
    //validateRequest(academicDepartmentValidations.createAcademicDepartmentValidation),
     academicDepartmentControllers.createAcademicDepartment);

router.get('/', academicDepartmentControllers.getAllAcademicDepartment);

router.get('/:academicId', academicDepartmentControllers.getSingleAcademicDepartment)

router.patch('/:academicId', validateRequest(academicDepartmentValidations.updateAcademicDepartmentValidation), academicDepartmentControllers.updateAcademicDepartment)

export const academicDepartmentRoutes = router