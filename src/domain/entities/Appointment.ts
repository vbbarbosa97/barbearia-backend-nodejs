import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('appointments')
export class Appointment {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	provider: string;

	@Column('time with time zone')
	date: Date;
}
