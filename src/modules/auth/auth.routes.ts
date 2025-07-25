import express from 'express';
import { AuthController } from './auth.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from './auth.validation';
import auth from '../../middlewares/auth';
import { userRoles } from '../user/user.constant';

const router = express.Router();

router.post('/login', validateRequest(AuthValidation.loginValidationSchema), AuthController.loginUser);

router.post('/change-password', auth(userRoles.student, userRoles.faculty, userRoles.admin), validateRequest(AuthValidation.changePasswordValidationSchema), AuthController.changePassword);

router.post('/refresh-token', validateRequest(AuthValidation.refreshTokenValidationSchema), AuthController.refreshToken);

export const authRoutes = router;
