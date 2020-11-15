import { compare } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import { SessionViewModel } from '../../../domain/models/SessionViewModel';
import { UserViewModel } from '../../../domain/models/UserViewModel';
import { UserRepository } from '../../../infrastructure/repositories/UserRepository';

class SessionService {
	public async Create(email: string, password: string): Promise<SessionViewModel> {
		const userRepository = getCustomRepository(UserRepository);

		const response = await userRepository.getByEmail(email);

		if (response === undefined) {
			throw new Error('Usuario não encontrado.');
		}

		const senhaCorreta = await compare(password, response.password);

		if (senhaCorreta === false) {
			throw new Error('Senha incorreta.');
		}

		const userViewModel = new UserViewModel(response);

		const session = new SessionViewModel({ user: userViewModel });

		return session;
	}
}

export default new SessionService();
