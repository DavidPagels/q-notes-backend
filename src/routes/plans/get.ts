
export async function getPlans(ctx: any) {
	const user = ctx.state.user || {};
	const { page = 1, pageSize = 10 } = ctx.request.query;
	const results = await ctx.mysql.sproc('get-plans', [user.sub || null, page, pageSize]);
	ctx.body = {records: results[0], page, pageSize, totalHits: results[1][0].totalHits};
}

export async function getPlan(ctx: any) {
	const user = ctx.state.user || {};
	const results = await ctx.mysql.sproc('get-plan', [ctx.params.planId, user.sub || null]);
	ctx.body = results[0].length ? results[0][0] : {};
}
