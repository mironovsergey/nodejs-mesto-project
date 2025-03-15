import { HttpError } from './http-error';
import { HTTP_STATUS } from '../constants';

export default class NotFoundError extends Error implements HttpError {
  public statusCode: number;

  constructor(message = 'Ресурс не найден') {
    super(message);
    this.statusCode = HTTP_STATUS.NOT_FOUND;
    this.name = 'NotFoundError';
  }
}
