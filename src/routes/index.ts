const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
import planRoutes from './plans';
import validateToken from '../middleware/validate-token';

export default function routes(app, mysqlConnection) {
	function decorateCtx(ctx, next) {
		ctx.mysql = mysqlConnection;
		return next();
	}


	planRoutes(router);
	
	// Todo: add auth middleware
	app
		.use(bodyParser())
		.use(function (ctx, next) {
  return next().catch((err) => {
  	console.log('errored')
  	console.log(err)
    if (err.status === 401) {
      ctx.status = 401;
      ctx.body = {
        error: err.originalError ? err.originalError.message : err.message
      };
    } else {
      throw err;
    }
  });
})
		.use(validateToken())
		.use(decorateCtx)
		.use(router.routes())
		.use(router.allowedMethods());
}