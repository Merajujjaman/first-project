import { Router } from "express";
import { studentRouts } from "../modules/student/student.routes";
import { userRouts } from "../modules/user/user.routes";
import { academicSemesterRouts } from "../modules/academicSemester/academicSemester.routes";
import { academicFacultyRoutes } from "../modules/academicFaculty/academicFaculty.routes";
import { academicDepartmentRoutes } from "../modules/academicDepartment/academicDepartment.routes";
import { facultyRoutes } from "../modules/faculty/faculty.routes";
import { adminRoutes } from "../modules/admin/admin.routes";
import { courseRoutes } from "../modules/course/course.routes";
import { semesterRegistrationRoutes } from "../modules/semesterRegistration/semesterRegistration.routes";

const router = Router();

const moduleRoutes = [
  {
    path: "/users",
    route: userRouts,
  },
  {
    path: "/students",
    route: studentRouts,
  },
  {
    path: "/faculties",
    route: facultyRoutes,
  },
  {
    path: "/admins",
    route: adminRoutes,
  },
  {
    path: "/academic-semesters",
    route: academicSemesterRouts,
  },
  {
    path: "/academic-faculties",
    route: academicFacultyRoutes,
  },
  {
    path: "/academic-departments",
    route: academicDepartmentRoutes,
  },
  {
    path: "/courses",
    route: courseRoutes,
  },
  {
    path: '/semester-registrations',
    route: semesterRegistrationRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
