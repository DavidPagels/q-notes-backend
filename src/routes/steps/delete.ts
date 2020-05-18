export async function deletePlanStep(ctx: any) {
	const results = await ctx.mysql.sproc('delete-step', [ctx.params.planId, ctx.params.stepId, ctx.state.user.sub]);
	ctx.body = results[0];
}