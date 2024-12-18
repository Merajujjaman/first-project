import { model, Schema } from "mongoose";
import {
  TCourse,
  TCourseFaculties,
  TPreRequisiteCourses,
} from "./course.interface";

const preRequisiteCoursesSchema = new Schema<TPreRequisiteCourses>({
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const courseSchema = new Schema<TCourse>(
  {
    title: {
      type: String,
      unique: true,
      trim: true,
      required: [true, "Course title is required"],
    },
    prefix: {
      type: String,
      trim: true,
      required: [true, "Prefix is required"],
    },
    code: {
      type: Number,
      trim: true,
      required: [true, "code is required"],
    },
    credits: {
      type: Number,
      trim: true,
      required: [true, "credit is required"],
    },
    preRequisiteCourses: [preRequisiteCoursesSchema],
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Course = model<TCourse>("Course", courseSchema);

const courseFacultiesSchema = new Schema<TCourseFaculties>({
  course: {
    type: Schema.Types.ObjectId,
    unique: true,
    ref: "Course",
  },
  faculties: [
    {
      type: Schema.Types.ObjectId,
      ref: "Faculty",
    },
  ],
});

export const CourseFaculty = model<TCourseFaculties>(
  "CourseFaculty",
  courseFacultiesSchema
);
