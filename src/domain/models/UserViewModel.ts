interface IUserViewModel {
	id: string;
	name: string;
	email: string;
}

export class UserViewModel implements IUserViewModel {
	id: string;
	name: string;
	email: string;

	constructor({ id, name, email }: IUserViewModel) {
		this.id = id;
		this.email = email;
		this.name = name;
	}
}
