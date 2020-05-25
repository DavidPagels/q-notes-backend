
export async function putStep(ctx: any) {
	// Todo: validate ctx.request.body contains planId and action
	const step = ctx.request.body;
	const { planId, stepId } = ctx.params;
	const { user } = ctx.state;
	
	try {
		await ctx.mysql.sproc('update-step', [planId, stepId, user.sub, step.action])
		ctx.body = {id: stepId, planId: planId, action: step.action};
		ctx.status = 200;
	} catch (e) {
		console.error(e);
		ctx.body = 'Error updating plan step';
		ctx.status = 400;
	}
}