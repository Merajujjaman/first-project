import httpStatus from "http-status";
import AppError from "../errors/AppError";
import catchAsync from "../utils/catchAsync";
import config from "../config";
import jwt, { JwtPayload } from "jsonwebtoken";
import { TUserRoles } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";

const auth = (...requiredRoles: TUserRoles[]) => {
  return catchAsync(async (req, res, next) => {
    // Check if the request has an authorization header
    const token = req.headers.authorization;
    // console.log(token);

    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized access");
    }

    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string
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
    ) =>{
      const passwordChangedTime = new Date(passwordChangedTimestamp).getTime() / 1000;
      return passwordChangedTime > jwtIssuedTimestamp;
    };

    if (
      user.passwordChangedAt &&
      isJWTIssuedBeforePasswordChanged(
        user.passwordChangedAt,
        iat as number,
      )
    ) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !');
    }


    if (
      requiredRoles.length &&
      !requiredRoles.includes(decoded.role as TUserRoles)
    ) {
      throw new AppError(httpStatus.FORBIDDEN, "Forbidden access");
    }

    // console.log(decoded);
    // Attach the user information to the request object
    req.user = decoded as JwtPayload;

    next();
  });
};

export default auth;
