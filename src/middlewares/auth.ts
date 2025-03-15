import { Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';
import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../errors';

const { JWT_SECRET } = process.env;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET не определен');
}

interface AuthRequest extends Request {
  user?: { _id: Types.ObjectId };
}

export default (req: AuthRequest, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedError('Требуется авторизация'));
    return;
  }

  const token = authorization.replace('Bearer ', '');

  try {
    const payload = jwt.verify(token, JWT_SECRET) as { _id: string };
    req.user = { _id: new Types.ObjectId(payload._id) };
    next();
  } catch (error) {
    next(new UnauthorizedError('Недействительный токен'));
  }
};
