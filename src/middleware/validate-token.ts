const { koaJwtSecret } = require('jwks-rsa');
const jwt = require('koa-jwt');
import config from 'config';

const validateToken = () => {
	const domain = config.get('auth0.domain');
	return jwt({ 
  	secret: koaJwtSecret({
  	  jwksUri: `https://${domain}/.well-known/jwks.json`,
  	  cache: true,
  	  cacheMaxEntries: 5
  	}),
  	audience: config.get('auth0.audience'),
  	issuer: `https://${domain}/` 
	}).unless({ path: [/^\/public/] });
};

export default validateToken;