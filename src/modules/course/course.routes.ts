import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { courseValidations } from "./course.validation";
import { courseControllers } from "./course.controller";
import auth from "../../middlewares/auth";
const router = express.Router();
//create course route:
router.post(
  "/create-course",
  auth("admin"),
  validateRequest(courseValidations.createCourseValidationSchema),
  courseControllers.createCourse
);

//get all course route:
router.get("/", courseControllers.getAllCourses);

//get single course route:
router.get("/:id", courseControllers.getSingleCourses);

//update course route:
router.patch(
  "/:id",
  auth("admin"),
  validateRequest(courseValidations.updateCourseValidationSchema),
  courseControllers.updateCourse
);

//delete course route:
router.delete("/:id", auth('admin'), courseControllers.deleteCourse);

//faculty assign into the course route:
router.put(
  "/:courseId/assign-faculties",
  auth("admin"),
  validateRequest(courseValidations.facultiesWithCourseValidationSchema),
  courseControllers.assignFAcultiesWithCourse
);

//faculty remove from course route:
router.delete(
  "/:courseId/remove-faculties",
  auth("admin"),
  validateRequest(courseValidations.facultiesWithCourseValidationSchema),
  courseControllers.removeFAcultiesFromCourse
);

export const courseRoutes = router;
