import { model, Document, Schema } from 'mongoose';
import validator from 'validator';

export interface IUser extends Document {
  name: string;
  about: string;
  avatar: string;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    about: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 200,
    },
    avatar: {
      type: String,
      required: true,
      validate: {
        validator: (v: string) => validator.isURL(v, { require_protocol: true }),
        message: 'Некорректая ссылка на аватарку',
      },
    },
  },
);

const User = model<IUser>('User', userSchema);

export default User;
