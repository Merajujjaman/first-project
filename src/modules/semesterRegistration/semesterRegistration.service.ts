import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TSemesterRegistration } from "./semesterRegistration.interface";
import { SemesterRegistration } from "./semesterRegistration.model";
import QueryBuilder from "../../builder/QueryBuilder";
import { RegistrationStatus } from "./semesterRegistration.constant";

const createSemesterRegistrationIntoDb = async (
  payload: TSemesterRegistration
) => {
  const academicSemester = payload?.academicSemester;

  //step1: Check is there any registered semester that is already 'UPCOMING' | 'ONGOING'
  const isThereAnyUpcomingOrOngoingSemester =
    await SemesterRegistration.findOne({
      $or: [
        { status: RegistrationStatus.UPCOMING },
        { status: RegistrationStatus.ONGOING }
      ],
    });

  if (isThereAnyUpcomingOrOngoingSemester) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `There is already an ${isThereAnyUpcomingOrOngoingSemester?.status} semester`
    );
  }
  //step2: Check if the semester is exist: -if not exist throw an error
  const isSemesterExist = await AcademicSemester.findById(academicSemester);
  if (!isSemesterExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "This academic semester not found !"
    );
  }

  //step2: Check is semester is already registered: -if true throw an error
  const isSemesterRegistered = await SemesterRegistration.findOne({
    academicSemester,
  });
  if (isSemesterRegistered) {
    throw new AppError(
      httpStatus.CONFLICT,
      "This semester is already registered!"
    );
  }

  const result = await SemesterRegistration.create(payload);
  return result;
};

const getAllSemesterRegistrationsFromDb = async (
  query: Record<string, unknown>
) => {
  const semesterRegistrationsQuery = new QueryBuilder(
    SemesterRegistration.find().populate("academicSemester"),
    query
  )
    .filter()
    .sort()
    .fields();
  const result = await semesterRegistrationsQuery.modelQuery;
  return result;
};

const getSingleRegistrationFromDb = async (id: string) => {
  const result =
    await SemesterRegistration.findById(id).populate("academicSemester");
  return result;
};

const updateSemesterRegistrationIntoDB = async (
  id: string,
  payload: Partial<TSemesterRegistration>
) => {
  const isSemesterRegistrationExist = await SemesterRegistration.findById(id);
  if (!isSemesterRegistrationExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "This semester registration not found !"
    );
  }

  const currentSemesterStatus = isSemesterRegistrationExist?.status;
  const requestSemesterStatus = payload?.status;
  if (currentSemesterStatus === "ENDED") {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This semester registration is already ${currentSemesterStatus}`
    );
  }

  if(currentSemesterStatus === RegistrationStatus.UPCOMING && requestSemesterStatus === RegistrationStatus.ENDED || currentSemesterStatus === RegistrationStatus.ONGOING && requestSemesterStatus === RegistrationStatus.UPCOMING){
    throw new AppError(httpStatus.BAD_REQUEST, `You can not directly change status from ${currentSemesterStatus} to ${requestSemesterStatus}`)
  }

  const result = await SemesterRegistration.findByIdAndUpdate(id, payload,{
    new: true,
    runValidators: true
  })
  return result;
};

export const semesterRegistrationServices = {
  createSemesterRegistrationIntoDb,
  getAllSemesterRegistrationsFromDb,
  getSingleRegistrationFromDb,
  updateSemesterRegistrationIntoDB,
};
