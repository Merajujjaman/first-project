import express from "express";
import { adminControllers } from "./admin.controller";
import validateRequest from "../../middlewares/validateRequest";
import { updateAdminValidationSchema } from "./admin.validation";

const router = express.Router();

//get all admin route:
router.get("/", adminControllers.getAllAdmins);
//get single admin route:
router.get("/:id", adminControllers.getSingleAdmin);
//update admin route:
router.patch(
  "/:id",
  validateRequest(updateAdminValidationSchema),
  adminControllers.updateAdmin
);
//delete admin route:
router.delete("/:id", adminControllers.deleteAdmin);
export const adminRoutes = router;
