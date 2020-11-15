import { hash } from 'bcryptjs';
import fs from 'fs';
import path from 'path';
import { getCustomRepository } from 'typeorm';
import { UserViewModel } from '../../../domain/models/UserViewModel';
import { UserRepository } from '../../../infrastructure/repositories/UserRepository';
import uploadConfig from '../../../shared/config/upload';
import { USER_ALREADY_EXISTS, USER_NOT_FOUND } from '../../../shared/constants/messages';
import CustomError from '../../../shared/utils/customError';

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

	public async UpdateAvatar(userId: string, filename: string): Promise<any> {
		try {
			const userRepository = getCustomRepository(UserRepository);
			const user = await userRepository.findOne(userId);

			if (user === undefined) {
				throw new CustomError(USER_NOT_FOUND, 422);
			}

			if (user.avatar !== null) {
				const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);

				//o fs me permite utilizar as funções do sistema
				//o stat traz o status de um arquivo, mas apenas se ele existir
				const userAvatarFileExist = await fs.promises.stat(userAvatarFilePath);

				if (userAvatarFileExist) {
					//o unlink deleta o arquivo
					await fs.promises.unlink(userAvatarFilePath);
				}
			}

			user.avatar = filename;
			await userRepository.save(user);

			return true;
		} catch (error: any) {
			throw new CustomError(error.message, 422);
		}
	}
}

export default new UserService();
