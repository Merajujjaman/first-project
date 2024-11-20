import mongoose from "mongoose";

const handleValidationError = (err: mongoose.Error.ValidationError) => {
  const errorSources = Object.values(err.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: val?.path,
        message: val?.message,
      };
    }
  );
  const statusCode = 400;
  const message = "Validation Error";
  return {
    statusCode,
    message,
    errorSources,
  };
};

export default handleValidationError;
