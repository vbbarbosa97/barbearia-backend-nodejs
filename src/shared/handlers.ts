// @ts-ignore
import { ValidationError } from 'express-validation';
import { VALIDATION_ERROR, INTERNAL_ERROR } from './messages';
import { Request, Response, NextFunction } from 'express';

export function validationError(
	err: ValidationError,
	req: Request,
	res: Response,
	next: NextFunction
) {
	if (err instanceof ValidationError) {
		return res.status(422).json({
			message: VALIDATION_ERROR,
			payload: err.errors,
			status: 422,
		});
	}
	return next(err);
}

export function internalError(
	err: ValidationError,
	req: Request,
	res: Response,
	next: NextFunction
) {
	return res.status(err.status || 500).json({
		payload: err.errors,
		status: err.status || 500,
		message: err.message || INTERNAL_ERROR,
	});
}

export function parseString(string: string) {
	if (string) {
		const parsedString = string.replace(/[\-.]/g, '');
		return parsedString;
	}
	return string;
}

export function generateRandomNumber(min: number, max: number) {
	return Math.floor(max + (min - max) * Math.random());
}

export function getUserAge(DOB: string | number) {
	const today = new Date();
	const birthDate = new Date(DOB);
	let age = today.getFullYear() - birthDate.getFullYear();
	const m = today.getMonth() - birthDate.getMonth();
	if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
		age -= 1;
	}

	return age;
}

export function generateVerifyCode(length = 4) {
	let text = '';
	const charList = '0123456789';
	for (let i = 0; i < length; i += 1) {
		text += charList.charAt(Math.floor(Math.random() * charList.length));
	}
	return text;
}
