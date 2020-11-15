import { NextFunction, Response, Request } from 'express';
import UserService from '../../services/users';

class UserController {
	async GetAll(req: Request, res: Response, next: NextFunction) {
		const { hostname, protocol } = req;

		UserService.GetAll(hostname, protocol)
			.then((payload) => res.status(200).json({ payload }))
			.catch((err) => next(err));
	}

	async Create(req: Request, res: Response, next: NextFunction) {
		const { nome, email, password } = req.body;

		UserService.Create(nome, email, password)
			.then((payload) => res.status(200).json({ payload }))
			.catch((err) => next(err));
	}

	async UpdateAvatar(req: Request, res: Response, next: NextFunction) {
		const { userId } = req.params;
		const { filename } = req.file;

		UserService.UpdateAvatar(userId, filename)
			.then((payload) => res.status(200).json({ payload }))
			.catch((err) => next(err));
	}
}

export default new UserController();
