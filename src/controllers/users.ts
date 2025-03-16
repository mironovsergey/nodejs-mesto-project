import { Request, Response, NextFunction } from 'express';
import { Error as MongooseError } from 'mongoose';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/user';
import { HTTP_STATUS } from '../constants';
import {
  NotFoundError, BadRequestError, ConflictError, UnauthorizedError,
} from '../errors';

const { JWT_SECRET } = process.env;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET не определен');
}

// Возвращает всех пользователей
export const getUsers = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  User.find()
    .then((users: IUser[]) => {
      res.status(HTTP_STATUS.OK).send(users);
    })
    .catch(next);
};

// Возвращает текущего пользователя
export const getUser = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userId = req.user?._id;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }

      res.status(HTTP_STATUS.OK).send(user);
    })
    .catch(next);
};

// Создает пользователя
export const createUser = (
  req: Request<{}, {}, IUser>,
  res: Response,
  next: NextFunction,
) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  User.create({
    name, about, avatar, email, password,
  })
    .then((user: IUser) => {
      res.status(HTTP_STATUS.CREATED).send(user);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        const errorMessages = Object.values<MongooseError.ValidatorError>(error.errors)
          .map(({ message }) => message)
          .join(' ');

        next(new BadRequestError(errorMessages));
      } else if (error.code === 11000) {
        next(new ConflictError('Email уже используется'));
      } else {
        next(error);
      }
    });
};

// Обновляет профиль
export const updateUser = (
  req: Request<{}, {}, { name: string; about: string }>,
  res: Response,
  next: NextFunction,
) => {
  const { name, about } = req.body;
  const userId = req.user?._id;

  User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      res.status(HTTP_STATUS.OK).send(user);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new BadRequestError('Некорректные данные пользователя'));
      } else {
        next(error);
      }
    });
};

// Обновляет аватар
export const updateAvatar = (
  req: Request<{}, {}, { avatar: string }>,
  res: Response,
  next: NextFunction,
) => {
  const { avatar } = req.body;
  const userId = req.user?._id;

  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      res.status(HTTP_STATUS.OK).send(user);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new BadRequestError('Некорректая ссылка на аватарку'));
      } else {
        next(error);
      }
    });
};

// Аутентификация
export const login = (
  req: Request<{}, {}, { email: string; password: string }>,
  res: Response,
  next: NextFunction,
) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      res.status(HTTP_STATUS.OK).send({ token });
    })
    .catch((error) => {
      next(new UnauthorizedError(error.message));
    });
};
