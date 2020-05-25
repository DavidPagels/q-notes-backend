import { getPlans, getPlan } from '../plans/get';

export default async function planRoutes(router) {
	router.get('/public/plans', getPlans);
	router.get('/public/plans/:planId', getPlan);
}