/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { ZodError, ZodIssue } from "zod";
import { TErrorSources } from "../interface/error";
import handleZodError from "../errors/handleZodError";
import config from "../config";
import handleValidationError from "../errors/handleValidationError";
import handleCastError from "../errors/handleCastError";
import handleDuplicateError from "../errors/handleDuplicateError";
import AppError from "../errors/AppError";

const globalErrorHandler : ErrorRequestHandler = (err,req,res,next) => {
  let statusCode = err.statusCode || 500;
  let  message = err.message || "something went wrong";

  let errorSources : TErrorSources[] = [
    {
        path: " ",
        message: "something went wrong"
    }
  ]

  if(err instanceof ZodError){
    
    const simplifiedError = handleZodError(err)
    
    message = simplifiedError?.message;
    statusCode = simplifiedError?.statusCode;
    errorSources = simplifiedError?.errorSources;
  }else if( err?.name === 'ValidationError'){
    const simplifiedError = handleValidationError(err)
    message = simplifiedError?.message;
    statusCode = simplifiedError?.statusCode;
    errorSources = simplifiedError?.errorSources;
  }else if(err?.name === 'CastError'){
    const simplifiedError = handleCastError(err)
    message = simplifiedError?.message;
    statusCode = simplifiedError?.statusCode;
    errorSources = simplifiedError?.errorSources;
  }else if(err?.code === 11000){
    const simplifiedError = handleDuplicateError(err)
    message = simplifiedError?.message;
    statusCode = simplifiedError?.statusCode;
    errorSources = simplifiedError?.errorSources;
  }else if(err instanceof AppError){
    message = err?.message;
    statusCode = err?.statusCode;
    errorSources = [{
      path: " ",
      message: err?.message
    }]
  }else if(err instanceof Error){
    message = err?.message;
    errorSources = [{
      path: " ",
      message: err?.message
    }]
  }



  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: config.NODE_ENV === 'development'? err?.stack : null,
    // err,
  });
};

export default globalErrorHandler;

/* 
success,
message,
errorSources: [
    {
        path,
        message
    }
],
stack (for development environment)
*/
