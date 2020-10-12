import express from 'express';
import './Infrastructure/Database';

const app = express();

app.use(express.json());

app.listen(3333, () => {
	console.log('Server iniciado na porta 3333!');
});
