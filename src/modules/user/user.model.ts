/* eslint-disable @typescript-eslint/no-this-alias */
import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";
import config from "../../config";
import bcrypt from "bcrypt";
import { userStatus } from "./user.constant";


const userSchema = new Schema<TUser>(
  {
    id: {
      type: String,
      required: [true, 'ID is required'],
      unique: true
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
    email:{
      type: String,
      required: true,
      unique: true,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    passwordChangedAt: {
      type: Date
    },
    role: {
      type: String,
      enum: ["student", "faculty", "admin"],
    },
    status: {
      type: String,
      enum: userStatus,
      default: "in-progress",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

//pre save middleware/hook
userSchema.pre("save", async function (next) {
  // console.log(this, "pre hook: we will save the data");
  const user = this;

  // hashing password and sent into DB:
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );

  next();
});

export const User = model<TUser>('User', userSchema)
