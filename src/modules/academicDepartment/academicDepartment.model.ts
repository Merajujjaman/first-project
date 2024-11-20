import { model, Schema } from "mongoose";
import { TAcademicDepartment } from "./academicDepartment.iterface";
import AppError from "../../errors/AppError";

const academicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: {
      type: String,
      required: [true, "Department name is required"],
      unique: true,
    },
    academicFaculty: {
      type: Schema.ObjectId,
      ref: "AcademicFaculty",
      required: [true, "Academic faculty is required"],
    },
  },
  {
    timestamps: true,
  }
);

academicDepartmentSchema.pre('save', async function (next) {
  const isAcademicDepartmentExist = await AcademicDepartment.findOne({name: this.name})
  if(isAcademicDepartmentExist) {
    throw new AppError (500,"This Department already exist!")
  }
  next()
})

academicDepartmentSchema.pre('findOneAndUpdate', async function (next){
  const query = this.getQuery()
  const isAcademicDepartmentExist = await AcademicDepartment.findOne(query)
  if(!isAcademicDepartmentExist){
    throw new AppError (404,'Academic department is not exist!')
  }
  next()
})

export const AcademicDepartment = model<TAcademicDepartment>(
  "AcademicDepartment",
  academicDepartmentSchema
);
