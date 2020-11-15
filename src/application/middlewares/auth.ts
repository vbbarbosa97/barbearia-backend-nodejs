import { NextFunction, Request, Response } from 'express';
import unless from 'express-unless';
import CustomError from '../../shared/customError';
import { decodeToken } from '../../shared/functions';
import { INVALID_TOKEN, TOKEN_IS_MISSING } from '../../shared/messages';

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
	try {
		const authHeader = req.body.token || req.headers.authorization;

		if (!authHeader) {
			throw new CustomError(TOKEN_IS_MISSING, 422);
		}
		const [, token] = authHeader.split(' ');
		const user = await decodeToken(token);

		if (user !== null) {
			return next();
		}

		throw new CustomError(INVALID_TOKEN, 498);
	} catch (e) {
		return next(e);
	}
}

authMiddleware.unless = unless;
