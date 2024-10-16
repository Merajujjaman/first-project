import { model, Schema } from "mongoose";
import {
  TAcademicSemester,
} from "./academicSemester.interface";
import { AcademicSemesterCode, AcademicSemesterName, Months } from "./academicSemester.constant";
import AppError from "../../errors/AppError";



const academicSemesterSchema = new Schema<TAcademicSemester>({
  name: {
    type: String,
    enum: AcademicSemesterName,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
    enum: AcademicSemesterCode,
  },
  startMonth: {
    type: String,
    required: true,
    enum: Months,
  },
  endMonth: {
    type: String,
    required: true,
    enum: Months,
  },
},{
    timestamps: true
});

//pre hook middleware
academicSemesterSchema.pre('save', async function (next){
    const isSemesterExist = await AcademicSemester.findOne({
        year: this.year,
        name: this.name
    })
    if(isSemesterExist){
        throw new AppError(500,'Already exist this semester in this year')
    }

    next()

})


export const AcademicSemester = model<TAcademicSemester>(
  "AcademicSemester",
  academicSemesterSchema
);
