export async function getPlanSteps(ctx: any) {
	const user = ctx.state.user || {};
	const results = await ctx.mysql.sproc('get-plan-steps', [ctx.params.planId, user.sub || null]);
	ctx.body = results[0];
}