import { hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import { UserViewModel } from '../../../domain/models/UserViewModel';
import { UserRepository } from '../../../infrastructure/repositories/UserRepository';
import CustomError from '../../../shared/customError';
import { USER_ALREADY_EXISTS } from '../../../shared/messages';

class UserService {
	public async GetAll(): Promise<UserViewModel[]> {
		try {
			const userRepository = getCustomRepository(UserRepository);
			const users = await userRepository.find();

			const userModel = users.map((user) => {
				return new UserViewModel(user);
			});

			return userModel;
		} catch (error: any) {
			throw new CustomError(error.message, 422);
		}
	}

	public async Create(nome: string, email: string, password: string): Promise<UserViewModel> {
		try {
			const userRepository = getCustomRepository(UserRepository);

			const checkUserExist = await userRepository.findOne({
				where: { email: email },
			});

			if (checkUserExist) {
				throw new CustomError(USER_ALREADY_EXISTS, 422);
			}

			const hashedPassword = await hash(password, 8);

			const user = userRepository.create({
				name: nome,
				email: email,
				password: hashedPassword,
			});

			await userRepository.save(user);

			const userModel = new UserViewModel(user);

			return userModel;
		} catch (error: any) {
			throw new CustomError(error.message, 422);
		}
	}
}

export default new UserService();
