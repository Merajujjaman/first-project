import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { OfferedCourseValidations } from './offeredCourse.validation';
import { OfferedCourseControllers } from './offeredCourse.controller';


const router = express.Router();

// router.get(
//   '/',
//   auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),
//   OfferedCourseControllers.getAllOfferedCourses,
// );

// router.get(
//   '/my-offered-courses',
//   auth(USER_ROLE.student),
//   OfferedCourseControllers.getMyOfferedCourses,
// );

// router.get(
//   '/:id',
//   auth(
//     USER_ROLE.superAdmin,
//     USER_ROLE.admin,
//     USER_ROLE.faculty,
//     USER_ROLE.student,
//   ),
//   OfferedCourseControllers.getSingleOfferedCourses,
// );

router.post(
  '/create-offered-course',
  validateRequest(OfferedCourseValidations.createOfferedCourseValidationSchema),
  OfferedCourseControllers.createOfferedCourse,
);

router.patch(
  '/:id',
  validateRequest(OfferedCourseValidations.updateOfferedCourseValidationSchema),
  OfferedCourseControllers.updateOfferedCourse,
);

router.delete(
  '/:id',
  OfferedCourseControllers.deleteOfferedCourseFromDB,
);

export const offeredCourseRoutes = router;