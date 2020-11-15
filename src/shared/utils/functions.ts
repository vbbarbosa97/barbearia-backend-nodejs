import jwt from 'jsonwebtoken';
import { IUserViewModel } from '../../domain/models/UserViewModel';
import { JwtConfig } from '../constants/values';

export function generateToken(userId: string) {
	return jwt.sign({ userId }, 'JwtConfig.tokenKey');
}

export async function decodeToken(token: string) {
	return jwt.verify(token, JwtConfig.tokenKey);
}
