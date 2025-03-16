import { Request, Response, NextFunction } from 'express';
import Card, { ICard } from '../models/card';
import { HTTP_STATUS } from '../constants';
import { NotFoundError, BadRequestError, ForbiddenError } from '../errors';

// Возвращает все карточки
export const getCards = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  Card.find()
    .then((cards: ICard[]) => {
      res.status(HTTP_STATUS.OK).send(cards);
    })
    .catch(next);
};

// Создаёт карточку
export const createCard = (
  req: Request<{}, {}, { name: string; link: string }>,
  res: Response,
  next: NextFunction,
) => {
  const { name, link } = req.body;
  const owner = req.user?._id;

  Card.create({ name, link, owner })
    .then((card: ICard) => {
      res.status(HTTP_STATUS.CREATED).send(card);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new BadRequestError('Некорректные данные карточки'));
      } else {
        next(error);
      }
    });
};

// Удаляет карточку
export const deleteCard = (
  req: Request<{ cardId: string }>,
  res: Response,
  next: NextFunction,
) => {
  const { cardId } = req.params;
  const owner = req.user?._id;

  Card.findById(cardId)
    .then((card: ICard | null) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      }

      if (!card.owner.equals(owner)) {
        throw new ForbiddenError('Нет прав для удаления этой карточки');
      }

      return Card.deleteOne({ _id: cardId });
    })
    .then(() => {
      res.status(HTTP_STATUS.OK).send({ message: 'Карточка удалена' });
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new BadRequestError('Некорректный ID карточки'));
      } else {
        next(error);
      }
    });
};

// Ставит лайк карточке
export const likeCard = (
  req: Request<{ cardId: string }>,
  res: Response,
  next: NextFunction,
) => {
  const { cardId } = req.params;
  const userId = req.user?._id;

  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: userId } }, { new: true })
    .then((card: ICard | null) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      }

      res.status(HTTP_STATUS.OK).send(card);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new BadRequestError('Некорректный ID карточки'));
      } else {
        next(error);
      }
    });
};

// Убирает лайк с карточки
export const dislikeCard = (
  req: Request<{ cardId: string }>,
  res: Response,
  next: NextFunction,
) => {
  const { cardId } = req.params;
  const userId = req.user?._id;

  Card.findByIdAndUpdate(cardId, { $pull: { likes: userId } }, { new: true })
    .then((card: ICard | null) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      }

      res.status(HTTP_STATUS.OK).send(card);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new BadRequestError('Некорректный ID карточки'));
      } else {
        next(error);
      }
    });
};
