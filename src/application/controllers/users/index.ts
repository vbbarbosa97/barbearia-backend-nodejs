import { NextFunction, Response, Request } from 'express';
import UserService from '../../services/users';

class UserController {
	async GetAll(req: Request, res: Response, next: NextFunction) {
		UserService.GetAll()
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
		// const { nome, email, password } = req.body;

		UserService.UpdateAvatar()
			.then((payload) => res.status(200).json({ payload }))
			.catch((err) => next(err));
	}
}

export default new UserController();
