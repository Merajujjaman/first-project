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


// Faculty ID
export const findLastFacultyId = async () => {
  const lastFaculty = await User.findOne(
    {
      role: 'faculty',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
};

export const generateFacultyId = async () => {
  let currentId = (0).toString();
  const lastFacultyId = await findLastFacultyId();

  if (lastFacultyId) {
    currentId = lastFacultyId.substring(2);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `F-${incrementId}`;

  return incrementId;
};

// Admin ID
export const findLastAdminId = async () => {
  const lastAdmin = await User.findOne(
    {
      role: 'admin',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastAdmin?.id ? lastAdmin.id.substring(2) : undefined;
};

export const generateAdminId = async () => {
  let currentId = (0).toString();
  const lastAdminId = await findLastAdminId();

  if (lastAdminId) {
    currentId = lastAdminId.substring(2);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `A-${incrementId}`;
  return incrementId;
};
