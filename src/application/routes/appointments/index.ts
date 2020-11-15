import { Router } from 'express';
import AppointmentController from '../../controllers/appointments';
const router = Router();

router.get('', AppointmentController.GetAll);

router.post('', AppointmentController.Create);

export default router;
