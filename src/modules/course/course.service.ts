import QueryBuilder from "../../builder/QueryBuilder";
import { courseSearchableFields } from "./course.constant";
import { TCourse } from "./course.interface";
import { Course } from "./course.model";

const createCourseIntoDb = async (payload: TCourse) => {
    const result = await Course.create(payload)
    return result;
}

const getAllCoursesFromDb = async (query: Record<string, unknown>) => {
    const courseQuery = new QueryBuilder(Course.find().populate('preRequisiteCourses.course'), query )
    .search(courseSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()
    const result = await courseQuery.modelQuery
    return result;
}

const getSingleCourseFromDb = async (id: string) => {
    const result = await Course.findById(id)
    return result;
}

const deleteCourseFromDb = async (id: string) => {
    const result = await Course.findByIdAndUpdate(id, {isDeleted: true}, {new: true})
    return result
}

export const courseServices ={
    createCourseIntoDb,
    getAllCoursesFromDb,
    getSingleCourseFromDb,
    deleteCourseFromDb
}