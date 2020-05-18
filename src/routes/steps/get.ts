export async function getPlanSteps(ctx: any) {
	const results = await ctx.mysql.sproc('get-plan-steps', [ctx.params.planId]);
	ctx.body = results[0];
}