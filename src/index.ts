import koa from 'koa';
import cors from '@koa/cors';
import routes from './routes/index';
import config from 'config';
const mysql = require('mysql2/promise');
const http = require('http');
const https = require('https');
const fs = require('fs');

async function getMySqlPool() {
	const mysqlPool = await mysql.createPool(config.get('mysql'));

	mysqlPool.sproc = async (sprocName, args) => {
		const wildcards = args.slice(0).fill('?').join(', ')
		const records = await mysqlPool.execute(`CALL \`${sprocName}\` (${wildcards})`, args);
		return records[0];
	}

	return mysqlPool;
}

async function startServer() {
	const app = new koa();
	app.use(cors());
	const mysqlPool = await getMySqlPool()

	routes(app, mysqlPool);

	http.createServer(app.callback())
		.listen(8080, () => console.log(JSON.stringify({message: `Listening on port 8080`})));
	https.createServer({
 		key: fs.readFileSync('/etc/letsencrypt/live/qnotesapi.tk/privkey.pem'),
 		cert: fs.readFileSync('/etc/letsencrypt/live/qnotesapi.tk/fullchain.pem'),
 		ca: fs.readFileSync('/etc/letsencrypt/live/qnotesapi.tk/chain.pem')
	}, app.callback())
		.listen(443, () => console.log(JSON.stringify({message: `Listening on port: 443`})));
}

startServer();
