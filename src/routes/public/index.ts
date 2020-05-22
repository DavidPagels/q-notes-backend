import { getPlans, getPlan } from '../plans/get';
import { getPlanSteps } from '../steps/get';

export default async function planRoutes(router) {
	router.get('/public/plans', getPlans);
	router.get('/public/plans/:planId', getPlan);
	router.get('/public/plans/:planId/steps', getPlanSteps);
}