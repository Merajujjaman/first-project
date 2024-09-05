import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { User } from "./user.model";

const findLastStudentId = async () => {
  const lastStudentId = await User.findOne(
    {
      role: "student",
    },
    {
        id: 1,
        _id: 0
    }
  ).sort({ createdAt : -1}).lean();
  return lastStudentId?.id? lastStudentId.id : undefined
};
export const generateId = async(payload: TAcademicSemester) => {
  let currentId =(0).toString();

  const lastStudentId = await findLastStudentId();
  const lastSemesterCode= lastStudentId?.substring(4,6);
  const lastSemesterYear = lastStudentId?.substring(0,4);
  const currentSemesterCode = payload.code;
  const currentSemesterYear = payload.year;

  if(lastStudentId && lastSemesterCode === currentSemesterCode && lastSemesterYear === currentSemesterYear){
        currentId = lastStudentId.substring(6)
  }
  
  let increaseId = (Number(currentId) + 1).toString().padStart(4, "0");
  increaseId = `${payload.year}${payload.code}${increaseId}`;
  return increaseId;
};
