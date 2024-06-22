import { Schema, model } from "mongoose";
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  StudentModel,
  TUserName,
} from "./student/student.interface";
import bcrypt from "bcrypt";
import config from "../config";
import { boolean } from "joi";
const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, "First name is requred"],
    maxlength: [10, "First name con not be more then 10 charecters"],
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: [true, "Last name is requred"],
    // validate: {
    //   validator: function (value: string) {
    //     const lastNameStr = value.charAt(0).toUpperCase() + value.slice(1);
    //     return value === lastNameStr;
    //   },
    //   message: "{VALUE} is not capitalized formate",
    // },
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  fatherContactNo: { type: String },
  motherName: { type: String, required: true },
  motherOccupation: { type: String, required: true },
  motherContactNo: { type: String, required: true },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  contactNo: { type: String, required: true },
  address: { type: String, required: true },
});

const studentSchema = new Schema<TStudent, StudentModel>({
  id: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: true },
  name: {
    type: userNameSchema,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    // validate: {
    //   validator: (value: string) => validator.isEmail(value),
    //   message: "{VALUE} is not an Email "
    // }
  },
  dateOfBirth: { type: String },
  gender: {
    type: String,
    enum: ["male", "female", "others"],
    required: true,
  },
  emergencyContactNo: { type: String, required: true },
  contactNo: { type: String, required: true },
  bloodGroup: {
    type: String,
    enum: {
      values: ["A+", "A-", "AB+", "AB-", "B+", "B-", "O+", "O-"],
      message: "{VALUE} is not valid",
    },
    required: true,
  },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: {
    type: guardianSchema,
    required: true,
  },
  localGuardian: {
    type: localGuardianSchema,
    required: true,
  },
  profileImg: { type: String },
  isActive: {
    type: String,
    enum: ["active", "blocked"],
    default: "active",
  },
  isDeleted:{
    type: Boolean,
    default: false
  }
}, {
  toJSON:{
    virtuals: true
  }
});

//-------virtual----------------//
studentSchema.virtual("fullName").get(function(){
  return(
    this.name.firstName+" "+this.name.middleName+" "+this.name.lastName
  )
})

//------------mongoos middleware----------------------//
//pre save middleware/hook
studentSchema.pre("save", async function (next) {
  // console.log(this, "pre hook: we will save the data");
  const user = this;

  // hashing password and sent into DB:
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );

  next();
});

//post save middleware/hook
studentSchema.post("save", function (doc, next) {
  // console.log(this, "post hook: we saved the data");
  doc.password = "";
  next()
});

//---------------Mongoos query middleware---------------
studentSchema.pre("find", function(next){
  this.find({isDeleted: {$ne: true}})
  next()
})
studentSchema.pre("findOne", function(next){
  this.find({isDeleted: {$ne: true}})
  next()
})

// [ { '$match': { id: '123456' } } ]
studentSchema.pre("aggregate", function(next){
  // console.log(this.pipeline());
  this.pipeline().unshift({$match : {isDeleted: {$ne : true}}})
  next()
})

// ---------------------------------------------------//
// create custom instance methodes
// studentSchema.methods.isUserExist = async function(id: string){
//   const existingUser = await Student.findOne({id: id})
//   return existingUser
// }

//create custom static methode
studentSchema.statics.isUserExist = async function (id: string) {
  const existingUser = await Student.findOne({ id: id });
  return existingUser;
};
//-----------------------------------------------------//
export const Student = model<TStudent, StudentModel>("Student", studentSchema);
