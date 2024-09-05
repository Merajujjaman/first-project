import { isValidObjectId } from "mongoose";
import { TAcademicFaculty } from "./academicFaculty.interface";
import { AcademicFaculty } from "./academicFaculty.model";

const createAcademicFacultyDB = async(payload:TAcademicFaculty) => {
    const result = await AcademicFaculty.create(payload)
    return result
}

const getAllAcademicFacultyDB = async () => {
    const result  = await AcademicFaculty.find()
    return result
}

const getSingleAcademicFacultyDB = async (id: string) => {
    if (!isValidObjectId(id)){
        throw new Error (`${id} this id is not valid object id`)
    }
    const result = await AcademicFaculty.findById(id)
    return result
}

export const academicFacultyServices = {
    createAcademicFacultyDB,
    getAllAcademicFacultyDB,
    getSingleAcademicFacultyDB
}