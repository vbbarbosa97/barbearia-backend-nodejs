import jwt from 'jsonwebtoken';
import { UserViewModel } from '../domain/models/UserViewModel';
import { JwtConfig } from './values';

export function generateToken(user: UserViewModel) {
	return jwt.sign(user, JwtConfig.tokenKey);
}

export async function decodeToken(token: string) {
	return jwt.verify(token, JwtConfig.tokenKey);
}
