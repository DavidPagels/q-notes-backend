import * as Router from 'koa-router';
import * as bodyParser from 'koa-bodyparser';
import * as serve from 'koa-static';
import * as mount from 'koa-mount';
import bugRoutes from './bugs';
import commentRoutes from './comments';
import planRoutes from './plans';
import publicRoutes from './public';
import stepRoutes from './steps';
import userRoutes from './users';
import userSettingsRoutes from './user-settings';
import handleAuthErrors from '../middleware/handle-auth-errors';
import validateToken from '../middleware/validate-token';

export default function routes(app, mysqlPool) {
	function decorateCtx(ctx, next) {
		ctx.mysql = mysqlPool;
		return next();
	}

	const router = Router();

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