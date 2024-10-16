import { isValidObjectId } from "mongoose";
import { TAcademicFaculty } from "./academicFaculty.interface";
import { AcademicFaculty } from "./academicFaculty.model";
import AppError from "../../errors/AppError";

const createAcademicFacultyDB = async(payload:TAcademicFaculty) => {
    const isExistAcademicFaculty = await AcademicFaculty.findOne({name: payload.name})
    if(isExistAcademicFaculty){
        throw new AppError (500,'This Academic Faculty Is Already Exist')
    }
    const result = await AcademicFaculty.create(payload)
    return result
}

const getAllAcademicFacultyDB = async () => {
    const result  = await AcademicFaculty.find()
    return result
}

const getSingleAcademicFacultyDB = async (id: string) => {
    if (!isValidObjectId(id)){
        throw new AppError (500,`${id} this id is not valid object id`)
    }
    const result = await AcademicFaculty.findById(id)
    return result
}

export const academicFacultyServices = {
    createAcademicFacultyDB,
    getAllAcademicFacultyDB,
    getSingleAcademicFacultyDB
}