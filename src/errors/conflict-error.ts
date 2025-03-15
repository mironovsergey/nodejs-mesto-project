import { HttpError } from './http-error';
import { HTTP_STATUS } from '../constants';

export default class ConflictError extends Error implements HttpError {
  public statusCode: number;

  constructor(message = 'Конфликт запроса') {
    super(message);
    this.statusCode = HTTP_STATUS.CONFLICT;
    this.name = 'ConflictError';
  }
}
