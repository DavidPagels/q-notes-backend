import { getPlans, getPlan } from '../plans/get';
import { getPlanComments } from '../comments/get';

export default async function planRoutes(router) {
	router.get('/public/plans', getPlans);
	router.get('/public/plans/:planId', getPlan);
	router.get('/public/plans/:planId/comments', getPlanComments);
}