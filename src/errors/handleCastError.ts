import mongoose from "mongoose";
import { TErrorResponse, TErrorSources } from "../interface/error";

const handleCastError = (err: mongoose.Error.CastError) : TErrorResponse => {
    const errorSources : TErrorSources []  = [{
        path: err?.path,
        message: err?.message
    }]
    const statusCode = 400;
  const message = "Invalid ID";
  return {
    statusCode,
    message,
    errorSources,
  };
}

export default handleCastError;