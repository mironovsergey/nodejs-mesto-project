import { HttpError } from './http-error';
import { HTTP_STATUS } from '../constants';

export default class BadRequestError extends Error implements HttpError {
  public statusCode: number;

  constructor(message = 'Некорректный запрос') {
    super(message);
    this.statusCode = HTTP_STATUS.BAD_REQUEST;
    this.name = 'BadRequestError';
  }
}
