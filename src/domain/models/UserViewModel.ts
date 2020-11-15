export interface IUserViewModel {
	id: string;
	name: string;
	email: string;
	avatar: string | null;
}

export class UserViewModel implements IUserViewModel {
	id: string;
	name: string;
	email: string;
	avatar: string | null;

	constructor({ id, name, email, avatar }: IUserViewModel) {
		this.id = id;
		this.email = email;
		this.name = name;
		this.avatar = avatar;
	}

	public addAvatar(avatar: string | null) {
		this.avatar = avatar;
	}
}
