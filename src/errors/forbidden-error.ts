import { HttpError } from './http-error';
import { HTTP_STATUS } from '../constants';

export default class ForbiddenError extends Error implements HttpError {
  public statusCode: number;

  constructor(message = 'Доступ запрещен') {
    super(message);
    this.statusCode = HTTP_STATUS.FORBIDDEN;
    this.name = 'ForbiddenError';
  }
}
