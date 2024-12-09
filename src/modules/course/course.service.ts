/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import { courseSearchableFields } from "./course.constant";
import { TCourse, TCourseFaculties } from "./course.interface";
import { Course, CourseFaculty } from "./course.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const createCourseIntoDb = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};

const getAllCoursesFromDb = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    Course.find().populate("preRequisiteCourses.course"),
    query
  )
    .search(courseSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await courseQuery.modelQuery;
  return result;
};

const getSingleCourseFromDb = async (id: string) => {
  const result = await Course.findById(id);
  return result;
};

//update course:
const updateCourseIntoDb = async (id: string, payload: Partial<TCourse>) => {
  const { preRequisiteCourses, ...restData } = payload;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const updateBasicCourseInfo = await Course.findByIdAndUpdate(id, restData, {
      new: true,
      runValidators: true,
      session,
    });

    if (!updateBasicCourseInfo) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to update course");
    }

    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      const deletePreRequisiteCoursesId = preRequisiteCourses
        .filter((el) => el.course && el.isDeleted)
        .map((el) => el.course);
      const deletePreRequisiteCourses = await Course.findByIdAndUpdate(
        id,
        {
          $pull: {
            preRequisiteCourses: {
              course: { $in: deletePreRequisiteCoursesId },
            },
          },
        },
        {
          new: true,
          runValidators: true,
          session,
        }
      );

      if (!deletePreRequisiteCourses) {
        throw new AppError(httpStatus.BAD_REQUEST, "Failed to remove Pre-Requisite course");
      }

      const addPreRequisiteCourseInfo = preRequisiteCourses.filter(
        (el) => el.course && !el.isDeleted
      );
      const addPreRequisiteCourse = await Course.findByIdAndUpdate(id, {
        $addToSet: {
          preRequisiteCourses: { $each: addPreRequisiteCourseInfo },
        },
      },{
        new: true,
        runValidators: true,
        session
      });
      if (!addPreRequisiteCourse) {
        throw new AppError(httpStatus.BAD_REQUEST, "Failed to  add new Pre-Requisite course");
      }
    }

    const result = await Course.findById(id).populate(
      "preRequisiteCourses.course"
    );

    await session.commitTransaction();
    await session.endSession()

    return result;
  } catch (error: any) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error(error)
  }
};

const deleteCourseFromDb = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
  return result;
};

//assign faculties with course:
const assignFacultiesWithCourseIntoDb = async (id: string, payload: Partial<TCourseFaculties>) => {
    const result = await CourseFaculty.findByIdAndUpdate(id, {
        course: id,
        $addToSet: {faculties: {$each: payload}}
    },{
        upsert: true,
        new: true
    })

    return result
}

//remove faculties from course:
const removeFacultiesFromCourseFromDb = async (id: string, payload: Partial<TCourseFaculties>) => {
    const result = await CourseFaculty.findByIdAndUpdate(id, {
        $pull: {faculties: {$in: payload}}
    }, 
    {
        new: true
    })
    return result;
}

export const courseServices = {
  createCourseIntoDb,
  getAllCoursesFromDb,
  getSingleCourseFromDb,
  updateCourseIntoDb,
  deleteCourseFromDb,
  assignFacultiesWithCourseIntoDb,
  removeFacultiesFromCourseFromDb
};
