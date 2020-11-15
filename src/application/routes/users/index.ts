import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../../../shared/config/upload';
import UserController from '../../controllers/users';

const router = Router();
const upload = multer(uploadConfig);

router.get('', UserController.GetAll);

router.post('', UserController.Create);

router.put('/avatar/:userId', upload.single('avatar'), UserController.UpdateAvatar);

export default router;
