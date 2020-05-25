import { getPlans, getPlan } from './get';
import { postPlan, postPlanAndSteps } from './post';
import { putPlan } from './put';

export default async function planRoutes(router) {
	router.get('/plans', getPlans);
	router.get('/plans/:planId', getPlan);
	router.post('/plans', postPlan);
	router.post('/plans/steps', postPlanAndSteps);
	router.put('/plans/:planId', putPlan);
}