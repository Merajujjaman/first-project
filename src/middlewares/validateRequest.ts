import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // validation using zod
      await schema.parseAsync({
        body: req.body,
        cookies: req.cookies,
      });

      next();
    } catch (err) {
      next(err);
    }
  };
};

export default validateRequest;
