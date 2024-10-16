import httpStatus from "http-status";
import mongoose from "mongoose";
import { Student } from "./student.model";
import { User } from "../user/user.model";
import AppError from "../../errors/AppError";
import { TStudent } from "./student.interface";




const getAllStudentFromDb = async() => {
    const result = await Student.find().populate('admissionSemester').populate({
        path: "academicDepartment",
        populate: {
            path: "academicFaculty"
        }
    })
    return result;
}

const getSingleStudentFromDb = async(id : string) => {
    // const result = await Student.findOne({id})
    const result = await Student.findOne({id}).populate('admissionSemester').populate({
        path: "academicDepartment",
        populate: {
            path: "academicFaculty"
        }
    })
    if(!result){
        throw new AppError(httpStatus.NOT_FOUND, 'Student not found')
    }
    return result;
}
const updateStudentToDb = async(id : string, payload: Partial<TStudent>) => {
    const {name, guardian, localGuardian, ...rest} = payload;
    const modifiedData : Record<string, unknown> = {
        ...rest
    }

    if(name && Object.keys(name).length){
        for(const [keys, value] of Object.entries(name)){
            modifiedData[`name.${keys}`] = value
        }
    }
    if(guardian && Object.keys(guardian).length){
        for(const [keys, value] of Object.entries(guardian)){
            modifiedData[`guardian.${keys}`] = value
        }
    }
    if(localGuardian && Object.keys(localGuardian).length){
        for(const [keys, value] of Object.entries(localGuardian)){
            modifiedData[`localGuardian.${keys}`] = value
        }
    }

    const result = await Student.findOneAndUpdate({id}, modifiedData, {new: true, runValidators: true})
    if(!result){
        throw new AppError(httpStatus.NOT_FOUND, 'Student not found')
    }
    return result;
}

const deleteStudentFromDb = async (id: string) => {

    const session = await mongoose.startSession()

    try {
        session.startTransaction()
        const deletedUser = await User.findOneAndUpdate({id: id}, {isDeleted: true}, {new: true, session})
        if(!deletedUser){
            throw new AppError( httpStatus.BAD_REQUEST,"Failed to delete User")
        }
        const deleteStudent = await Student.findOneAndUpdate({id: id}, {isDeleted: true}, {new: true, session})
        if(!deleteStudent){
            throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete Student")
        }

        await session.commitTransaction()
        await session.endSession()
        return deleteStudent
    } catch (error) {
        await session.abortTransaction()
        await session.endSession()
        throw error
    }
}

export  const StudentServices = {
    getAllStudentFromDb,
    getSingleStudentFromDb,
    deleteStudentFromDb,
    updateStudentToDb
}