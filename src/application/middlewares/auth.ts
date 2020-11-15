import { NextFunction, Request, Response } from 'express';
import unless from 'express-unless';
import CustomError from '../../shared/utils/customError';
import { decodeToken } from '../../shared/utils/functions';
import { INVALID_TOKEN, TOKEN_IS_MISSING } from '../../shared/constants/messages';

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
	try {
		const authHeader = req.body.token || req.headers.authorization;

		if (!authHeader) {
			throw new CustomError(TOKEN_IS_MISSING, 422);
		}
		const [, token] = authHeader.split(' ');
		await decodeToken(token);

		return next();
	} catch (e) {
		return next(new CustomError(INVALID_TOKEN, 498));
	}
}

authMiddleware.unless = unless;
