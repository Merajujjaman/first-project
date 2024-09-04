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
  return lastStudentId?.id? lastStudentId.id.substring(6) : undefined
};
export const generateId = async(payload: TAcademicSemester) => {
  const correntId = ( await findLastStudentId()) || (0).toString();
  let increaseId = (Number(correntId) + 1).toString().padStart(4, "0");
  increaseId = `${payload.year}${payload.code}${increaseId}`;
  return increaseId;
};
