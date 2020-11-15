import { generateToken } from '../../shared/utils/functions';
import { IUserViewModel } from './UserViewModel';

interface ISessionViewModel {
	user: IUserViewModel;
	token?: string;
}

export class SessionViewModel implements ISessionViewModel {
	user: IUserViewModel;
	token?: string;

	constructor({ user }: ISessionViewModel) {
		this.user = user;
		this.token = generateToken(user.id);
	}
}
