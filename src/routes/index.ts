import { Router } from "express";
import { studentRouts } from "../modules/student/student.rout";
import { userRouts } from "../modules/user/user.rout";

const router = Router()

const moduleRoutes = [
    {
        path: '/users',
        route: userRouts
    },
    {
        path: '/students',
        route: studentRouts
    }
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router;