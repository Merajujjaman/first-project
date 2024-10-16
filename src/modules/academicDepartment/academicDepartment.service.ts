import { isValidObjectId } from "mongoose";
import { TAcademicDepartment } from "./academicDepartment.iterface";
import { AcademicDepartment } from "./academicDepartment.model";
import AppError from "../../errors/AppError";



const createAcademicDepartmentDB = async(payload:TAcademicDepartment) => {
    const result = await AcademicDepartment.create(payload)
    return result
}

const getAllAcademicDepartmentDB = async () => {
    const result  = await AcademicDepartment.find().populate('academicFaculty')
    return result
}

const getSingleAcademicDepartmentDB = async (id: string) => {
    if (!isValidObjectId(id)){
        throw new AppError (500,`${id} this id is not valid object id`)
    }
    const result = await AcademicDepartment.findById(id).populate('academicFaculty')
    return result
}
const updateAcademicDepartmentDB = async (id: string, payload: Partial<TAcademicDepartment>) => {
    if (!isValidObjectId(id)){
        throw new AppError (500,`${id} this id is not valid object id`)
    }
    const result = await AcademicDepartment.findOneAndUpdate({_id: id}, payload, {new: true})
    return result
}

export const academicDepartmeServices = {
    createAcademicDepartmentDB,
    getAllAcademicDepartmentDB,
    getSingleAcademicDepartmentDB,
    updateAcademicDepartmentDB
}