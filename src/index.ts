import koa from 'koa';
import * as cors from '@koa/cors';
import routes from './routes/index';
import * as config from 'config';
import * as mysql from 'mysql2/promise';
import * as http from 'http';
import * as https from 'https';
import * as fs from 'fs';

async function getMySqlPool() {
	const mysqlPool: mysql.Pool & { sproc?: any } = await mysql.createPool(config.get('mysql'));

	mysqlPool.sproc = async (sprocName: string, args: any[]) => {
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
		.listen(8080, () => console.log(JSON.stringify({ message: `Listening on port 8080` })));
	https.createServer({
		key: fs.readFileSync('/etc/letsencrypt/live/qnotesapi.tk/privkey.pem'),
		cert: fs.readFileSync('/etc/letsencrypt/live/qnotesapi.tk/fullchain.pem'),
		ca: fs.readFileSync('/etc/letsencrypt/live/qnotesapi.tk/chain.pem')
	}, app.callback())
		.listen(443, () => console.log(JSON.stringify({ message: `Listening on port: 443` })));
}

startServer();
