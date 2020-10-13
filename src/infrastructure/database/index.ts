import { createConnection } from 'typeorm';

createConnection().then(() => {
	console.log('Conexão com banco de dados estabelecida com sucesso!');
});
