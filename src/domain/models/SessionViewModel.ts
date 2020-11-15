import { UserViewModel } from './UserViewModel';
import { generateToken } from '../../shared/functions';

interface ISessionViewModel {
	user: UserViewModel;
	token?: string;
}

export class SessionViewModel implements ISessionViewModel {
	user: UserViewModel;
	token?: string;

	constructor({ user }: ISessionViewModel) {
		this.user = new UserViewModel(user);
		this.token = generateToken(user);
	}
}
