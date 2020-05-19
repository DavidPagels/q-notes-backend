import koa from 'koa';
import cors from '@koa/cors';
import routes from './routes/index';
import config from 'config';
const mysql = require('mysql2/promise');
const https = require('https');
const fs = require('fs');

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

	https.createServer({
  	key: fs.readFileSync('/etc/letsencrypt/live/qnotesapi.tk/privkey.pem'),
  	cert: fs.readFileSync('/etc/letsencrypt/live/qnotesapi.tk/fullchain.pem'),
  	ca: fs.readFileSync('/etc/letsencrypt/live/qnotesapi.tk/chain.pem')
	}, app)
		.listen(443, () => console.log(JSON.stringify({message: `Listening on port: 443`})));
}

startServer();