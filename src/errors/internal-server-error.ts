import { HttpError } from './http-error';
import { HTTP_STATUS } from '../constants';

export default class InternalServerError extends Error implements HttpError {
  public statusCode: number;

  constructor(message = 'Ошибка сервера') {
    super(message);
    this.statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR;
    this.name = 'InternalServerError';
  }
}
