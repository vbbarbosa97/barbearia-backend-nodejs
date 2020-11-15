import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import './infrastructure/database';

//Config
import * as handlers from './shared/handlers';

//Rotas
import Appointments from './application/routes/appointments';
import Users from './application/routes/users';
import Auth from './application/routes/auth';

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use('/api/appointments', Appointments);
app.use('/api/users', Users);
app.use('/api/session', Auth);

app.use(handlers.validationError);
app.use(handlers.internalError);

app.listen(3333, () => {
	console.log('Server iniciado na porta 3333!');
});
