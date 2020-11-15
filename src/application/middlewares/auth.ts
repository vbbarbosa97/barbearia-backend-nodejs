// export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
// 	try {
// 		const authHeader = req.body.token || req.headers.authorization;

// 		if (!authHeader) {
// 			throw new CustomError(TOKEN_IS_MISSING, 422);
// 		}
// 		const [, token] = authHeader.split(' ');
// 		const userId = await decodeToken(token);

// 		if (userId !== null) {
// 			req.userId = userId.data;
// 			return next();
// 		}

// 		throw new CustomError(INVALID_TOKEN, 498);
// 	} catch (e) {
// 		return next(e);
// 	}
// }
