import { postSteps } from './post';
import { putStep } from './put';
import { deletePlanStep } from './delete';

export default async function stepRoutes(router) {
	router.post('/plans/:planId/steps', postSteps)
	router.put('/plans/:planId/steps/:stepId', putStep)
	router.delete('/plans/:planId/steps/:stepId', deletePlanStep)
}