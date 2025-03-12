import express, { Request, Response, NextFunction } from 'express';
import { rateLimit } from 'express-rate-limit';
import mongoose, { Types } from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/users';
import cardRoutes from './routes/cards';
import HTTP_STATUS from './constants/http';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mestodb';
const PORT = process.env.PORT || 3000;

const app = express();

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

app.use((req: Request, res: Response, next: NextFunction) => {
  req.user = { _id: new Types.ObjectId('67cea8a5d630c27092bacedf') };
  next();
});

app.use('/users', userRoutes);
app.use('/cards', cardRoutes);

app.use((req: Request, res: Response) => {
  res.status(HTTP_STATUS.NOT_FOUND).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT);
