import { Router } from 'express';
import {
  validateUpdateUser,
  validateUpdateAvatar,
} from '../middlewares/validations';
import {
  getUsers, getUser, updateUser, updateAvatar,
} from '../controllers/users';

const router = Router();

router.get('/', getUsers);
router.get('/me', getUser);
router.patch('/me', validateUpdateUser, updateUser);
router.patch('/me/avatar', validateUpdateAvatar, updateAvatar);

export default router;
