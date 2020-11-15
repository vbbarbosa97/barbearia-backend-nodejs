import { EntityRepository, Repository } from 'typeorm';
import { User } from '../../domain/entities/User';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
	public async getByEmail(email: string): Promise<User | undefined> {
		const response = await this.findOne({ where: { email: email } });

		return response;
	}
}
