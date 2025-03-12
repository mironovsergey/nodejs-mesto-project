import express, { Request, Response, NextFunction } from 'express';
import mongoose, { Types } from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/users';
import cardRoutes from './routes/cards';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mestodb';
const PORT = process.env.PORT || 3000;

const app = express();

mongoose.connect(MONGO_URI);

app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  req.user = { _id: new Types.ObjectId('67cea8a5d630c27092bacedf') };
  next();
});

app.use('/users', userRoutes);
app.use('/cards', cardRoutes);

app.listen(PORT);
