
export async function postSteps(ctx: any) {
	// Todo: validate ctx.request.body contains planId and action
	const steps = ctx.request.body;
	await Promise.all(steps.map(async step => {
		try {
			await ctx.mysql.sproc('add-step', [ctx.params.planId, step.action])
			ctx.status = 204;
		} catch (e) {
			console.error(e);
			ctx.body = 'Error adding plan step';
			ctx.status = 400;
		}
	}));
}