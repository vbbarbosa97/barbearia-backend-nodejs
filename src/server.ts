import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import './infrastructure/database';

//Config
import * as handlers from './shared/utils/handlers';
import uploadConfig from './shared/config/upload';

//Middlewares
import { authMiddleware } from './application/middlewares/auth';

//Rotas
import Appointments from './application/routes/appointments';
import Users from './application/routes/users';
import Auth from './application/routes/auth';

const app = express();
const unless = {
	path: [{ url: /^\/api\/session/ }, { url: /^\/files/ }],
};

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(authMiddleware.unless(unless));

app.use('/api/appointment', Appointments);
app.use('/api/user', Users);
app.use('/api/session', Auth);
app.use('/files', express.static(uploadConfig.directory));

app.use(handlers.validationError);
app.use(handlers.internalError);

app.listen(3333, () => {
	console.log('Server iniciado na porta 3333!');
});
