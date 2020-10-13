import { Router } from 'express';
import UserController from '../../controllers/users';
const router = Router();

router.get('/obter', UserController.GetAll);

router.post('/criar', UserController.Create);

export default router;
