import { celebrate, Joi, Segments } from 'celebrate';

const urlPattern = /^(https?:\/\/)(?:www\.|(?!www))([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[-._~:/?#[\]@!$&'()*+,;=0-9a-zA-Z]*#?)?$/;

export const validateSignin = celebrate({
  [Segments.BODY]: Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

export const validateSignup = celebrate({
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(200),
    avatar: Joi.string().pattern(urlPattern),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

export const validateUpdateUser = celebrate({
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(200).required(),
  }),
});

export const validateUpdateAvatar = celebrate({
  [Segments.BODY]: Joi.object({
    avatar: Joi.string().required().pattern(urlPattern),
  }),
});

export const validateCreateCard = celebrate({
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required().pattern(urlPattern),
  }),
});

export const validateCardId = celebrate({
  [Segments.PARAMS]: Joi.object({
    cardId: Joi.string().hex().length(24).required(),
  }),
});
