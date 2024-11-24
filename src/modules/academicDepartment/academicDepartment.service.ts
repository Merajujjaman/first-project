import { TAcademicDepartment } from "./academicDepartment.iterface";
import { AcademicDepartment } from "./academicDepartment.model";



const createAcademicDepartmentDB = async(payload:TAcademicDepartment) => {
    const result = await AcademicDepartment.create(payload)
    return result
}

const getAllAcademicDepartmentDB = async () => {
    const result  = await AcademicDepartment.find().populate('academicFaculty')
    return result
}

const getSingleAcademicDepartmentDB = async (id: string) => {
   
    const result = await AcademicDepartment.findById(id).populate('academicFaculty')
    return result
}
const updateAcademicDepartmentDB = async (id: string, payload: Partial<TAcademicDepartment>) => {
    
    const result = await AcademicDepartment.findOneAndUpdate({_id: id}, payload, {new: true})
    return result
}

export const academicDepartmentServices = {
    createAcademicDepartmentDB,
    getAllAcademicDepartmentDB,
    getSingleAcademicDepartmentDB,
    updateAcademicDepartmentDB
}