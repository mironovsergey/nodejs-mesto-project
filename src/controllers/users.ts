import { Request, Response } from 'express';
import User, { IUser } from '../models/user';
import HTTP_STATUS from '../constants/http';

// Возвращает всех пользователей
export const getUsers = (
  req: Request,
  res: Response,
) => {
  User.find()
    .then((users: IUser[]) => {
      res.status(HTTP_STATUS.OK).send(users);
    })
    .catch(() => {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send({ message: 'Ошибка поиска пользователей' });
    });
};

// Возвращает пользователя по идентификатору
export const getUser = (
  req: Request<{ userId: string }>,
  res: Response,
) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user: IUser | null) => {
      if (user) {
        res.status(HTTP_STATUS.OK).send(user);
      } else {
        res.status(HTTP_STATUS.NOT_FOUND).send({ message: 'Пользователь не найден' });
      }
    })
    .catch(() => {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send({ message: 'Ошибка поиска пользователя' });
    });
};

// Создает пользователя
export const createUser = (
  req: Request<{}, {}, IUser>,
  res: Response,
) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user: IUser) => {
      res.status(HTTP_STATUS.CREATED).send(user);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(HTTP_STATUS.BAD_REQUEST).send({ message: 'Некорректные данные пользователя' });
      } else {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send({ message: 'Ошибка создания пользователя' });
      }
    });
};

// Обновляет профиль
export const updateUser = (
  req: Request<{}, {}, { name: string; about: string }>,
  res: Response,
) => {
  const { name, about } = req.body;
  const userId = req.user?._id;

  User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .then((user: IUser | null) => {
      if (user) {
        res.status(HTTP_STATUS.OK).send(user);
      } else {
        res.status(HTTP_STATUS.NOT_FOUND).send({ message: 'Пользователь не найден' });
      }
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(HTTP_STATUS.BAD_REQUEST).send({ message: 'Некорректные данные пользователя' });
      } else {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send({ message: 'Ошибка обновления профиля' });
      }
    });
};

// Обновляет аватар
export const updateAvatar = (
  req: Request<{}, {}, { avatar: string }>,
  res: Response,
) => {
  const { avatar } = req.body;
  const userId = req.user?._id;

  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .then((user: IUser | null) => {
      if (user) {
        res.status(HTTP_STATUS.OK).send(user);
      } else {
        res.status(HTTP_STATUS.NOT_FOUND).send({ message: 'Пользователь не найден' });
      }
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(HTTP_STATUS.BAD_REQUEST).send({ message: 'Некорректая ссылка на аватарку' });
      } else {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send({ message: 'Ошибка обновления аватара' });
      }
    });
};
