import { getPlanSteps } from './get';
import { postSteps } from './post';
import { deletePlanStep } from './delete';

export default async function stepRoutes(router) {
	router.get('/plans/:planId/steps', getPlanSteps);
	router.post('/plans/:planId/steps', postSteps)
	router.delete('/plans/:planId/steps/:stepId', deletePlanStep)
}