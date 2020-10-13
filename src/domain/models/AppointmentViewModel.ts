import { UserViewModel, IUserViewModel } from './UserViewModel';

export interface IAppointmentViewModel {
	id: string;
	date: Date;
	provider: IUserViewModel | null;
}

export class AppointmentViewModel implements IAppointmentViewModel {
	id: string;
	date: Date;
	provider: IUserViewModel | null;

	constructor({ id, date, provider }: IAppointmentViewModel) {
		this.id = id;
		this.date = date;
		this.provider = provider !== null ? new UserViewModel(provider) : null;
	}
}
