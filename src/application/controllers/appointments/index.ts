import { NextFunction, Response, Request } from 'express';
import AppointmentService from '../../services/appointments';

class AppointmentController {
	async GetAll(req: Request, res: Response, next: NextFunction) {
		AppointmentService.GetAll()
			.then((payload) => res.status(200).json({ payload }))
			.catch((err) => next(err));
	}

	async Create(req: Request, res: Response, next: NextFunction) {
		const { date, provider } = req.body;

		AppointmentService.Create(date, provider)
			.then((payload) => res.status(200).json({ payload }))
			.catch((err) => next(err));
	}
}

export default new AppointmentController();
