import { ValidationError } from 'express-validator';
import { CustomError } from './CustomError';

export class RequestValidationError extends CustomError {
  statusCode: number = 400;
  constructor(public errors: ValidationError[]) {
    super('Invalid Request Parameters');
  }

  serializeErrors() {
    return this.errors.map((err) => ({ message: err.msg, field: err.param }));
  }
}
