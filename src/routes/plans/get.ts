
export async function getPlans(ctx: any) {
	const user = ctx.state.user || {};
	const { page = 1, pageSize = 10 } = ctx.request.query;
	const results = await ctx.mysql.sproc('get-plans', [user.sub || null, page, pageSize]);
	ctx.body = {records: results[0], page, pageSize, totalHits: results[1][0].totalHits};
}

export async function getPlan(ctx: any) {
	const { user = {}} = ctx.state;
	const { planId } = ctx.params;
	const [planResults, stepsResults] = await Promise.all([
		ctx.mysql.sproc('get-plan', [planId, user.sub || null]),
		ctx.mysql.sproc('get-plan-steps', [planId, user.sub || null])
	]);

	const plan = planResults[0].length ? planResults[0][0] : {};
	plan.steps = stepsResults[0];
	ctx.body = plan;
}
