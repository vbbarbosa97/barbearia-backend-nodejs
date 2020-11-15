import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import { AppointmentViewModel } from '../../../domain/models/AppointmentViewModel';
import { AppointmentRepository } from '../../../infrastructure/repositories/AppointmentRepository';
import CustomError from '../../../shared/utils/customError';
import { APPOINTMENT_ALREDY_EXIST } from '../../../shared/constants/messages';

class AppointmentService {
	public async GetAll(): Promise<AppointmentViewModel[]> {
		try {
			const appointmentRepository = getCustomRepository(AppointmentRepository);
			const appointments = await appointmentRepository.find({ relations: ['provider'] });

			const appointmentsModel = appointments.map((item) => {
				return new AppointmentViewModel(item);
			});

			return appointmentsModel;
		} catch (error: any) {
			throw new CustomError(error.message, 422);
		}
	}

	public async Create(date: Date, provider_id: string): Promise<AppointmentViewModel> {
		try {
			const appointmentRepository = getCustomRepository(AppointmentRepository);

			const appointmentDate = startOfHour(date);

			const findAppointmentInSameDate = await appointmentRepository.findByDate(appointmentDate);

			if (findAppointmentInSameDate) {
				throw new CustomError(APPOINTMENT_ALREDY_EXIST, 422);
			}

			const appointment = appointmentRepository.create({
				provider_id: provider_id,
				date: appointmentDate,
			});

			await appointmentRepository.save(appointment);

			const appointmentModel = new AppointmentViewModel(appointment);

			return appointmentModel;
		} catch (error: any) {
			throw new CustomError(error.message, 422);
		}
	}
}

export default new AppointmentService();
