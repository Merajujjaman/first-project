import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { courseValidations } from "./course.validation";
import { courseControllers } from "./course.controller";
const router = express.Router();
//create course route:
router.post(
  "/create-course",
  validateRequest(courseValidations.createCourseValidationSchema),
  courseControllers.createCourse
);

//get all course route: 
router.get('/', courseControllers.getAllCourses)

//get single course route:
router.get('/:id', courseControllers.getSingleCourses)

//delete course route:
router.delete('/:id', courseControllers.deleteCourse)

export const courseRoutes = router;
