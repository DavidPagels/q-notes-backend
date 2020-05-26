const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const serve = require('koa-static');
const mount = require('koa-mount');
import bugRoutes from './bugs';
import commentRoutes from './comments';
import planRoutes from './plans';
import publicRoutes from './public';
import stepRoutes from './steps';
import userRoutes from './users';
import userSettingsRoutes from './user-settings';
import handleAuthErrors from '../middleware/handle-auth-errors';
import validateToken from '../middleware/validate-token';

export default function routes(app, mysqlConnection) {
	function decorateCtx(ctx, next) {
		ctx.mysql = mysqlConnection;
		return next();
	}

	bugRoutes(router);
	commentRoutes(router);
	planRoutes(router);
	publicRoutes(router);
	stepRoutes(router);
	userRoutes(router);
	userSettingsRoutes(router);
	
	app
		.use(mount("/.well-known", serve("./.well-known")))
		.use(bodyParser())
		.use(handleAuthErrors)
		.use(validateToken())
		.use(decorateCtx)
		.use(router.routes())
		.use(router.allowedMethods());
}