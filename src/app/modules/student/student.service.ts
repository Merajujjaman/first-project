import { StudentModel } from "../student.model";
import { Student } from "./student.interface";


const createSudentInDb= async( student:Student) => {

    const result = await StudentModel.create(student)
    return result
}

const getStudentFromDb = async() => {
    const result = await StudentModel.find()
    return result;
}

const getSingleStudentFromDb = async(id : string) => {
    const result = await StudentModel.findOne({id})
    return result;
}

export  const StudentServices = {
    createSudentInDb,
    getStudentFromDb,
    getSingleStudentFromDb
}