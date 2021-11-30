import { NextFunction, Response } from 'express';
import { Request } from 'express-validator/src/base';
import { CustomError } from '../errors/CustomError';

export default (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ errors: err.serializeErrors() });
  }

  res
    .status(400)
    .json({ errors: [{ message: err.message || 'Something Went Wrong' }] });
};
