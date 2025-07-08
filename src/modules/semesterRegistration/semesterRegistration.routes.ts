import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { SemesterRegistrationValidations } from "./semesterRegistration.validation";
import { semesterRegistrationControllers } from "./semesterRegistration.controller";

const router = express.Router();

router.post(
  "/create-semester-registration",
  validateRequest(
    SemesterRegistrationValidations.createSemesterRegistrationValidationSchema
  ),
  semesterRegistrationControllers.createSemesterRegistration
);
router.get("/", semesterRegistrationControllers.getAllSemesterRegistrations);
router.get("/:id", semesterRegistrationControllers.getSingleRegistration);

router.patch(
  "/:id",
  validateRequest(
    SemesterRegistrationValidations.updateSemesterRegistrationValidationSchema
  ),
  semesterRegistrationControllers.updateSemesterRegistration
);

export const semesterRegistrationRoutes = router;
