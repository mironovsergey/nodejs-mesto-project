import {
  model, Document, Model, Schema,
} from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import { SALT_ROUNDS } from '../constants';

export interface IUser extends Document {
  name: string;
  about: string;
  avatar: string;
  email: string;
  password: string;
}

interface IUserModel extends Model<IUser> {
  findUserByCredentials(_email: string, _password: string): Promise<IUser>;
}

const userSchema = new Schema<IUser, IUserModel>(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
      default: 'Жак-Ив Кусто',
    },
    about: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 200,
      default: 'Исследователь',
    },
    avatar: {
      type: String,
      required: true,
      validate: {
        validator: (v: string) => validator.isURL(v, { require_protocol: true }),
        message: 'Некорректая ссылка на аватарку',
      },
      default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: (v: string) => validator.isEmail(v),
        message: 'Некорректный email',
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
      validate: {
        validator: (v: string) => validator.isStrongPassword(v),
        message: 'Пароль не соответствует требованиям безопасности',
      },
    },
  },
);

userSchema.static('findUserByCredentials', async function findUserByCredentials(
  email: string,
  password: string,
) {
  const user = await this.findOne({ email }).select('+password');

  if (!user) {
    throw new Error('Неверная почта или пароль');
  }

  const matched = await bcrypt.compare(password, user.password);

  if (!matched) {
    throw new Error('Неверная почта или пароль');
  }

  return user;
});

userSchema.pre('save', async function preSave() {
  if (!this.isModified('password')) {
    return;
  }

  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  const password = await bcrypt.hash(this.password, salt);

  this.password = password;
});

const User = model<IUser, IUserModel>('User', userSchema);

export default User;
