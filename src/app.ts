import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { rateLimit } from 'express-rate-limit';
import mongoose from 'mongoose';
import { errors } from 'celebrate';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger';
import { validateSignin, validateSignup } from './middlewares/validations';
import auth from './middlewares/auth';
import { requestLogger, errorLogger } from './middlewares/logger';
import userRoutes from './routes/users';
import cardRoutes from './routes/cards';
import { HTTP_STATUS } from './constants';
import { login, createUser } from './controllers/users';
import { HttpError, NotFoundError } from './errors';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mestodb';
const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Превышен лимит запросов' },
});

mongoose.connect(MONGO_URI);

app.use(limiter);
app.use(express.json());

app.use(requestLogger);

app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Mesto API Documentation',
}));

app.post('/signin', validateSignin, login);
app.post('/signup', validateSignup, createUser);
app.use('/users', auth, userRoutes);
app.use('/cards', auth, cardRoutes);

app.use('*', (req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

app.use(errorLogger);

app.use(errors());

app.use((err: HttpError, req: Request, res: Response, _next: NextFunction) => {
  const { statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === HTTP_STATUS.INTERNAL_SERVER_ERROR
        ? 'Ошибка сервера'
        : message,
    });
});

app.listen(PORT);
