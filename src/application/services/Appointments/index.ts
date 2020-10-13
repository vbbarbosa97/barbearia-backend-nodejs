import { getCustomRepository } from 'typeorm';
import { startOfHour } from 'date-fns';
import { Appointment } from '../../../domain/entities/Appointment';
import { AppointmentRepository } from '../../../infrastructure/repositories/AppointmentRepository';
import { AppointmentViewModel } from '../../../domain/models/AppointmentViewModel';

class AppointmentService {
	public async GetAll(): Promise<AppointmentViewModel[]> {
		const appointmentRepository = getCustomRepository(AppointmentRepository);
		const appointments = await appointmentRepository.find({ relations: ['provider'] });

		const appointmentsModel = appointments.map((item) => {
			return new AppointmentViewModel(item);
		});

		return appointmentsModel;
	}

	public async Create(date: Date, provider_id: string): Promise<AppointmentViewModel> {
		const appointmentRepository = getCustomRepository(AppointmentRepository);

		const appointmentDate = startOfHour(date);

		const findAppointmentInSameDate = await appointmentRepository.findByDate(appointmentDate);

		if (findAppointmentInSameDate) {
			throw new Error('Ja existe um agendamento nesta data.');
		}

		const appointment = appointmentRepository.create({
			provider_id: provider_id,
			date: appointmentDate,
		});

		await appointmentRepository.save(appointment);

		const appointmentModel = new AppointmentViewModel(appointment);

		return appointmentModel;
	}
}

export default new AppointmentService();
