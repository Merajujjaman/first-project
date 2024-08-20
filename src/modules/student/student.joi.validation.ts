// import Joi from "joi";

    
// // create a joi schema 
// const userNameSchema = Joi.object({
//     firstName: Joi.string()
//       .max(10)
//       .required()
//       .messages({
//         'string.max': 'First name cannot be more than 10 characters',
//         'any.required': 'First name is required'
//       }),
//     middleName: Joi.string().optional(),
//     lastName: Joi.string()
//       .required()
//       .messages({
//         'any.required': 'Last name is required'
//       })
//   });
  
//   const guardianSchema = Joi.object({
//     fatherName: Joi.string().required(),
//     fatherOccupation: Joi.string().required().messages({
//       'any.required': 'Father occupation is required'
//     }),
//     fatherContactNo: Joi.string().optional(),
//     motherName: Joi.string().required().messages({
//       'any.required': 'Mother name is required'
//     }),
//     motherOccupation: Joi.string().required().messages({
//       'any.required': 'Mother occupation is required'
//     }),
//     motherContactNo: Joi.string().required().messages({
//       'any.required': 'Mother contact number is required'
//     })
//   });
  
//   const localGuardianSchema = Joi.object({
//     name: Joi.string().required().messages({
//       'any.required': 'Name is required'
//     }),
//     occupation: Joi.string().required().messages({
//       'any.required': 'Occupation is required'
//     }),
//     contactNo: Joi.string().required().messages({
//       'any.required': 'Contact number is required'
//     }),
//     address: Joi.string().required().messages({
//       'any.required': 'Address is required'
//     })
//   });
  
//   const studentSchema = Joi.object({
//     id: Joi.string().required().messages({
//       'any.required': 'ID is required'
//     }),
//     name: userNameSchema.required(),
//     email: Joi.string().email().required().messages({
//       'string.email': '{#label} is not a valid email',
//       'any.required': 'Email is required'
//     }),
//     dateOfBirth: Joi.string().optional(),
//     gender: Joi.string().valid('male', 'female', 'others').required().messages({
//       'any.required': 'Gender is required',
//       'any.only': '{#label} must be one of [male, female, others]'
//     }),
//     emergencyContactNo: Joi.string().required().messages({
//       'any.required': 'Emergency contact number is required'
//     }),
//     contactNo: Joi.string().required().messages({
//       'any.required': 'Contact number is required'
//     }),
//     bloodGroup: Joi.string().valid('A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-').required().messages({
//       'any.required': 'Blood group is required',
//       'any.only': '{#label} is not valid'
//     }),
//     presentAddress: Joi.string().required().messages({
//       'any.required': 'Present address is required'
//     }),
//     permanentAddress: Joi.string().required().messages({
//       'any.required': 'Permanent address is required'
//     }),
//     guardian: guardianSchema.required(),
//     localGuardian: localGuardianSchema.required(),
//     profileImg: Joi.string().optional(),
//     isActive: Joi.string().valid('active', 'blocked').default('active')
//   });

//   export default studentSchema;