import { Request } from 'express';
import { Types } from 'mongoose';

declare module 'express' {
  interface Request {
    user?: {
      _id: Types.ObjectId;
    };
  }
}
