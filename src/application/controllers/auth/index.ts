import { NextFunction, Request, Response } from 'express';

class SessionController {
	async Create(req: Request, res: Response, next: NextFunction) {
		const { email, password } = req.body;

		// UserService.Create(nome, email, password)
		// 	.then((payload) => res.status(200).json({ payload }))
		// 	.catch((err) => next(err));
	}
}

export default new SessionController();
