const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const serve = require('koa-static');
const mount = require('koa-mount');
import planRoutes from './plans';
import stepRoutes from './steps';
import userRoutes from './users';
import validateToken from '../middleware/validate-token';

export default function routes(app, mysqlConnection) {
	function decorateCtx(ctx, next) {
		console.log()
		ctx.mysql = mysqlConnection;
		return next();
	}

	function handleAuthErrors(ctx, next) {
		return next().catch((err) => {
    	if (err.status === 401) {
      	ctx.status = 401;
      	ctx.body = {
        	error: err.originalError ? err.originalError.message : err.message
      	};
    	} else {
      	throw err;
    	}
		});
	}


	planRoutes(router);
	stepRoutes(router);
	userRoutes(router);
	
	app
		.use(mount("/.well-known", serve("./.well-known")))
		.use(bodyParser())
		.use(handleAuthErrors)
		.use(validateToken())
		.use(decorateCtx)
		.use(router.routes())
		.use(router.allowedMethods());
}