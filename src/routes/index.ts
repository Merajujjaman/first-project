import { Router } from "express";
import { studentRouts } from "../modules/student/student.rout";
import { userRouts } from "../modules/user/user.rout";
import { academicSemesterRouts } from "../modules/academicSemester/academicSemester.rout";
import { academicFacultyRoutes } from "../modules/academicFaculty/academicFaculty.rout";

const router = Router()

const moduleRoutes = [
    {
        path: '/users',
        route: userRouts
    },
    {
        path: '/students',
        route: studentRouts
    },
    {
        path: '/academic-semesters',
        route: academicSemesterRouts
    },
    {
        path: '/academic-faculties',
        route: academicFacultyRoutes
    }
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router;