import { Router } from "express";
import { studentRouts } from "../modules/student/student.rout";
import { userRouts } from "../modules/user/user.rout";
import { academicSemesterRouts } from "../modules/academicSemester/academicSemester.rout";

const router = Router()

const moduleRoutes = [
    {
        path: '/users',
        route: userRouts
    },
    {
        path: '/academic-semesters',
        route: academicSemesterRouts
    },
    {
        path: '/students',
        route: studentRouts
    }
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router;