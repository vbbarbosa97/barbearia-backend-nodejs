import { Router } from 'express';
import SessionController from '../../controllers/auth';

const router = Router();

router.post('', SessionController.Create);

export default router;
