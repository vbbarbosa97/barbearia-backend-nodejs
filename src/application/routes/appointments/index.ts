import { Router } from 'express';
import AppointmentController from '../../controllers/appointments';
const router = Router();

router.get('/obter', AppointmentController.GetAll);

router.post('/criar', AppointmentController.Create);

export default router;
