import {
  model, Document, Schema, Types,
} from 'mongoose';
import validator from 'validator';

export interface ICard extends Document {
  name: string;
  link: string;
  owner: Types.ObjectId;
  likes: Types.ObjectId[];
  createdAt: Date;
}

const cardSchema = new Schema<ICard>(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    link: {
      type: String,
      required: true,
      validate: {
        validator: (v: string) => validator.isURL(v, { require_protocol: true }),
        message: 'Некорректая ссылка на картинку',
      },
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    likes: {
      type: [Schema.Types.ObjectId],
      ref: 'User',
      default: [],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
);

const Card = model<ICard>('Card', cardSchema);

export default Card;
