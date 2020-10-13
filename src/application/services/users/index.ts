import { getCustomRepository } from 'typeorm';
import { User } from '../../../domain/entities/User';
import { UserRepository } from '../../../infrastructure/repositories/UserRepository';

class UserService {
	public async GetAll(): Promise<User[]> {
		const userRepository = getCustomRepository(UserRepository);
		const users = await userRepository.find();
		return users;
	}

	public async Create(nome: string, email: string, password: string): Promise<User> {
		const userRepository = getCustomRepository(UserRepository);

		const checkUserExist = await userRepository.findOne({
			where: { email: email },
		});

		if (checkUserExist) {
			throw new Error('Email ja cadastrado.');
		}

		const user = userRepository.create({
			name: nome,
			email: email,
			password: password,
		});

		await userRepository.save(user);
		return user;
	}
}

export default new UserService();
