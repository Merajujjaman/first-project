import { userRoles } from "./user.constant";

export type TUser = {
  id: string;
  password: string;
  email: string;
  needsPasswordChange: boolean;
  passwordChangedAt: Date;
  role: "admin" | "student" | "faculty";
  status: "in-progress" | "blocked";
  isDeleted: boolean;
};

export type TUserRoles = keyof typeof userRoles;
