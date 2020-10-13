import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import './infrastructure/database';

//Rotas
import Appointments from './application/routes/appointments';

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

app.use('/api/appointments', Appointments);

app.listen(3333, () => {
	console.log('Server iniciado na porta 3333!');
});
