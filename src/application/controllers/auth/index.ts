import { NextFunction, Request, Response } from 'express';
import SessionService from '../../services/auth';

class SessionController {
	async Create(req: Request, res: Response, next: NextFunction) {
		const { email, password } = req.body;
		const { hostname, protocol } = req;

		SessionService.Create(email, password, hostname, protocol)
			.then((payload) => res.status(200).json({ payload }))
			.catch((err) => next(err));
	}
}

export default new SessionController();
