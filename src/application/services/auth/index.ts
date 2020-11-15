import { compare } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import { SessionViewModel } from '../../../domain/models/SessionViewModel';
import { UserViewModel } from '../../../domain/models/UserViewModel';
import { UserRepository } from '../../../infrastructure/repositories/UserRepository';
import CustomError from '../../../shared/customError';
import { INCORRECT_PASSWORD, USER_NOT_FOUND } from '../../../shared/messages';

class SessionService {
	public async Create(email: string, password: string): Promise<SessionViewModel> {
		try {
			const userRepository = getCustomRepository(UserRepository);

			const response = await userRepository.getByEmail(email);

			if (response === undefined) {
				throw new CustomError(USER_NOT_FOUND, 422);
			}

			const senhaCorreta = await compare(password, response.password);

			if (senhaCorreta === false) {
				throw new CustomError(INCORRECT_PASSWORD, 422);
			}

			const userViewModel = new UserViewModel(response);

			const session = new SessionViewModel({ user: userViewModel });

			return session;
		} catch (error: any) {
			throw new CustomError(error.message, 422);
		}
	}
}

export default new SessionService();
