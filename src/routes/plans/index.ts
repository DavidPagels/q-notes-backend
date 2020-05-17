import { getPlans, getPlan } from './get';
import { postPlan } from './post';

export default async function planRoutes(router) {
	router.get('/plans', getPlans);
	router.get('/plans/:planId', getPlan);
	router.post('/plans', postPlan);
}