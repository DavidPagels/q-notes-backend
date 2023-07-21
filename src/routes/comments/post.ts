export async function postPlanComment(ctx: any) {
	const user = ctx.state.user || {};
	const { planId } = ctx.params;
	const { comment } = ctx.request.body;
	await ctx.mysql.sproc('add-plan-comment', [user.sub || null, planId, comment]);
	ctx.status = 204;
}