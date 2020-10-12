import { getCustomRepository } from 'typeorm';
import { startOfHour } from 'date-fns';
import { Appointment } from '../../../domain/entities/Appointment';
import { ICriarAppointment } from '../../../domain/interfaces/IAppointments';
import { AppointmentRepository } from '../../../infrastructure/repositories/AppointmentRepository';

export class AppointmentService {
	public async create({ date, provider }: ICriarAppointment): Promise<Appointment> {
		const appointmentRepository = getCustomRepository(AppointmentRepository);
		const appointmentDate = startOfHour(date);

		const findAppointmentInSameDate = appointmentRepository.findByDate(appointmentDate);

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
