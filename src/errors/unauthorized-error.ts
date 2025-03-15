import { HttpError } from './http-error';
import { HTTP_STATUS } from '../constants';

export default class UnauthorizedError extends Error implements HttpError {
  public statusCode: number;

  constructor(message = 'Требуется авторизация') {
    super(message);
    this.statusCode = HTTP_STATUS.UNAUTHORIZED;
    this.name = 'UnauthorizedError';
  }
}
