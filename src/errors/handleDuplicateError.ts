/* eslint-disable @typescript-eslint/no-explicit-any */
import { TErrorResponse, TErrorSources } from "../interface/error";

const handleDuplicateError = (err: any): TErrorResponse => {
  const match = err?.message?.match(/name: "(.*?)"/);
  const extractMessage = match ? match[1] : null;

  const errorSources: TErrorSources[] = [
    {
      path: " ",
      message: `${extractMessage} is already exist`,
    },
  ];
  const statusCode = 400;
  const message = "Duplicate Error";
  return {
    statusCode,
    message,
    errorSources,
  };
};

export default handleDuplicateError;
