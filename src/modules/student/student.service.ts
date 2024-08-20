import { Student } from "./student.model";




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
    getStudentFromDb,
    getSingleStudentFromDb,
    deleteStudentFromDb
}