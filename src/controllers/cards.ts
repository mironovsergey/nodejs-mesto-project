import { Request, Response } from 'express';
import Card, { ICard } from '../models/card';
import HTTP_STATUS from '../constants/http';

// Возвращает все карточки
export const getCards = (
  req: Request,
  res: Response,
) => {
  Card.find()
    .then((cards: ICard[]) => {
      res.status(HTTP_STATUS.OK).send(cards);
    })
    .catch(() => {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send({ message: 'Ошибка поиска карточек' });
    });
};

// Создаёт карточку
export const createCard = (
  req: Request<{}, {}, { name: string; link: string }>,
  res: Response,
) => {
  const { name, link } = req.body;
  const owner = req.user?._id;

  Card.create({ name, link, owner })
    .then((card: ICard) => {
      res.status(HTTP_STATUS.CREATED).send(card);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(HTTP_STATUS.BAD_REQUEST).send({ message: 'Некорректные данные карточки' });
      } else {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send({ message: 'Ошибка создания карточки' });
      }
    });
};

// Удаляет карточку по идентификатору
export const deleteCard = (
  req: Request<{ cardId: string }>,
  res: Response,
) => {
  const { cardId } = req.params;
  const userId = req.user?._id;

  Card.findOneAndDelete({ _id: cardId, owner: userId })
    .then((card: ICard | null) => {
      if (card) {
        res.status(HTTP_STATUS.OK).send({ message: 'Карточка удалена' });
      } else {
        res.status(HTTP_STATUS.NOT_FOUND).send({ message: 'Карточка не найдена' });
      }
    })
    .catch(() => {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send({ message: 'Ошибка удаления карточки' });
    });
};

// Ставит лайк карточке
export const likeCard = (
  req: Request<{ cardId: string }>,
  res: Response,
) => {
  const { cardId } = req.params;
  const userId = req.user?._id;

  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: userId } }, { new: true })
    .then((card: ICard | null) => {
      if (card) {
        res.status(HTTP_STATUS.OK).send(card);
      } else {
        res.status(HTTP_STATUS.NOT_FOUND).send({ message: 'Карточка не найдена' });
      }
    })
    .catch(() => {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send({ message: 'Ошибка добавления лайка' });
    });
};

// Убирает лайк с карточки
export const dislikeCard = (
  req: Request<{ cardId: string }>,
  res: Response,
) => {
  const { cardId } = req.params;
  const userId = req.user?._id;

  Card.findByIdAndUpdate(cardId, { $pull: { likes: userId } }, { new: true })
    .then((card: ICard | null) => {
      if (card) {
        res.status(HTTP_STATUS.OK).send(card);
      } else {
        res.status(HTTP_STATUS.NOT_FOUND).send({ message: 'Карточка не найдена' });
      }
    })
    .catch(() => {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send({ message: 'Ошибка удаления лайка' });
    });
};
