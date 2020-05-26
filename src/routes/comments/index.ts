import { getPlanComments } from './get';
import { postPlanComment } from './post';

export default async function commentRoutes(router) {
	router.get('/plans/:planId/comments', getPlanComments)
	router.post('/plans/:planId/comments', postPlanComment);
}
