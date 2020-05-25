import { postBug } from './post';

export default async function bugsRoutes(router) {
	router.post('/bugs', postBug);
}
