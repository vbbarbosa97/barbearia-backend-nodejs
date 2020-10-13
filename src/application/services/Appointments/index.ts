import { getCustomRepository } from 'typeorm';
import { startOfHour } from 'date-fns';
import { Appointment } from '../../../domain/entities/Appointment';
import { AppointmentRepository } from '../../../infrastructure/repositories/AppointmentRepository';

class AppointmentService {
	public async GetAll(): Promise<Appointment[]> {
		const appointmentRepository = getCustomRepository(AppointmentRepository);
		const appointments = await appointmentRepository.find();
		return appointments;
	}

	public async Create(date: Date, provider: string): Promise<Appointment> {
		const appointmentRepository = getCustomRepository(AppointmentRepository);
		const appointmentDate = startOfHour(date);

		const findAppointmentInSameDate = await appointmentRepository.findByDate(appointmentDate);

		if (findAppointmentInSameDate) {
			throw Error('Ja existe um agendamento nesta data.');
		}

		const appointment = appointmentRepository.create({
			provider: provider,
			date: appointmentDate,
		});

		await appointmentRepository.save(appointment);
		return appointment;
	}
}

export default new AppointmentService();
