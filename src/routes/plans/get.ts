
export async function getPlans(ctx: any) {
	console.log(ctx.state.user)
	const results = await ctx.mysql.sproc('get-plans', [ctx.state.user.sub]);
	ctx.body = results[0];
}

export async function getPlan(ctx: any) {
	const results = await ctx.mysql.sproc('get-plan', [ctx.params.planId])
	ctx.body = results[0].length ? results[0][0] : {};
}
