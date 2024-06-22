import { Student } from "../student.model";
import { TStudent } from "./student.interface";


const createSudentInDb= async( studentData:TStudent) => {

    if(await Student.isUserExist(studentData.id)){
        throw new Error('User already exist')
    }
    const result = await Student.create(studentData) // builtin static mathode


    // const student = new Student(studentData)  // create instance methode
    // if(await student.isUserExist(studentData.id)){
    //     throw new Error('User already exist')
    // }
    // const result = await student.save() 
    return result
}

const getStudentFromDb = async() => {
    const result = await Student.find()
    return result;
}

const getSingleStudentFromDb = async(id : string) => {
    // const result = await Student.findOne({id})
    const result = await Student.aggregate([
        {$match:{id: id}}
    ])
    return result;
}

const deleteStudentFromDb = async (id: string) => {
    const result = await Student.updateOne({id: id}, {isDeleted: true})
    return result
}

export  const StudentServices = {
    createSudentInDb,
    getStudentFromDb,
    getSingleStudentFromDb,
    deleteStudentFromDb
}