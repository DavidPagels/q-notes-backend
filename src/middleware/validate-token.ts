const { koaJwtSecret } = require('jwks-rsa');
const jwt = require('koa-jwt');
import config from 'config';

const validateToken = () => {
	console.log('this far')
	const domain = config.get('auth0.domain');
	return jwt({ 
  	secret: koaJwtSecret({
  	  jwksUri: `https://${domain}/.well-known/jwks.json`,
  	  cache: true,
  	  cacheMaxEntries: 5
  	}),
  	audience: config.get('auth0.audience'),
  	issuer: `https://${domain}/` 
	})
}

export default validateToken;