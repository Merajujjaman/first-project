import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";

const loginUser = async (payload: TLoginUser) => {
  const isUserExist = await User.findOne({ id: payload.id });

  // Check if user exists
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  //check is user is deleted
  if (isUserExist.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, "User is deleted");
  }
  // Check the user's status
  if (isUserExist.status === "blocked") {
    throw new AppError(httpStatus.FORBIDDEN, "User is blocked");
  }
  // Check if the password is correct
  const isPasswordMatch = await bcrypt.compare(
    payload?.password,
    isUserExist?.password
  );

  if (!isPasswordMatch) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Password is incorrect");
  }

  const jwtPayload = {
    userId: isUserExist.id,
    role: isUserExist.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: "1d",
  });
  const refreshToken = jwt.sign(
    jwtPayload,
    config.jwt_refresh_secret as string,
    {
      expiresIn: "30d",
    }
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange: isUserExist?.needsPasswordChange,
  };
};

const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string }
) => {
  // checking if the user is exist
  const isUserExist = await User.findOne({ id: userData.userId });
  // Check if user exists
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
  }

  // checking if the user is already deleted
  if (isUserExist?.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, "This user is deleted !");
  }

  // checking if the user is blocked
  if (isUserExist?.status === "blocked") {
    throw new AppError(httpStatus.FORBIDDEN, "This user is blocked ! !");
  }

  // Check if the password is correct
  const isPasswordMatch = await bcrypt.compare(
    payload.oldPassword,
    isUserExist.password
  );

  if (!isPasswordMatch) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Password is incorrect");
  }

  //hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds)
  );

  await User.findOneAndUpdate(
    {
      id: userData.userId,
      role: userData.role,
    },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    }
  );

  return null;
};

const refreshToken = async (token: string) => {
  if (!token) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized access");
  }

  const decoded = jwt.verify(
    token,
    config.jwt_refresh_secret as string
  ) as JwtPayload;
  //check if user exists:
  const user = await User.findOne({ id: decoded.userId });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "user not found");
  }
  // Check if the user is deleted:
  if (user.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, "User is deleted");
  }
  // Check if the user is blocked:
  if (user.status === "blocked") {
    throw new AppError(httpStatus.FORBIDDEN, "User is blocked");
  }

  // Check if the JWT is issued before the user's password was changed
  const iat = decoded.iat;
  const isJWTIssuedBeforePasswordChanged = (
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number
  ) => {
    const passwordChangedTime =
      new Date(passwordChangedTimestamp).getTime() / 1000;
    return passwordChangedTime > jwtIssuedTimestamp;
  };

  if (
    user.passwordChangedAt &&
    isJWTIssuedBeforePasswordChanged(user.passwordChangedAt, iat as number)
  ) {
    throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized !");
  }

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: "1d",
  });

  return {
    accessToken
  }
};

export const AuthService = {
  loginUser,
  changePassword,
  refreshToken,
};
