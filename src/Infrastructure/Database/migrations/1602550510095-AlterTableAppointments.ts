import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm';

export default class AlterTableAppointments1602550510095 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropColumn('appointments', 'provider');

		await queryRunner.addColumn(
			'appointments',
			new TableColumn({
				name: 'provider_id',
				type: 'uuid',
				isNullable: true,
			})
		);

		await queryRunner.createForeignKey(
			'appointments',
			new TableForeignKey({
				name: 'AppointmentProvider_FK',
				columnNames: ['provider_id'],
				referencedTableName: 'users',
				referencedColumnNames: ['id'],
				onDelete: 'SET NULL',
				onUpdate: 'CASCADE',
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropForeignKey('appointments', 'AppointmentProvider_FK');

		await queryRunner.dropColumn('appointments', 'provider_id');

		await queryRunner.addColumn(
			'appointments',
			new TableColumn({
				name: 'provider',
				type: 'varchar',
				isNullable: false,
			})
		);
	}
}
