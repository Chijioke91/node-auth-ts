import { CustomError } from './CustomError';

export class NotAuthorizedError extends CustomError {
  statusCode: number = 401;

  constructor() {
    super('Unauthorized Access');
  }

  serializeErrors() {
    return [{ message: 'Unauthorized Access' }];
  }
}
