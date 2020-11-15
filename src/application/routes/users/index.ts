import { Router } from 'express';
import UserController from '../../controllers/users';
const router = Router();

router.get('', UserController.GetAll);

router.post('', UserController.Create);

export default router;
