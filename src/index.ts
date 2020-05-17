import koa from 'koa';
import cors from '@koa/cors';
import routes from './routes/index';
import config from 'config';
const mysql = require('mysql2/promise');

async function getMySqlConnection() {
	const sqlConnection = await mysql.createConnection(config.get('mysql'));

	sqlConnection.sproc = async (sprocName, args) => {
		const wildcards = args.slice(0).fill('?').join(', ')
		const records = await sqlConnection.execute(`CALL \`${sprocName}\` (${wildcards})`, args);
		return records[0];
	}

	return sqlConnection;
}

async function startServer() {
	const app = new koa();
	app.use(cors());
	const sqlConnection = await getMySqlConnection()

	routes(app, sqlConnection);
	
	const port = config.get('port') || 8080;
	app.listen(port, () => console.log(JSON.stringify({message: `Listening on port: ${port}`})));
}

startServer();