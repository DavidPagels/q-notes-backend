export async function getPlanComments(ctx: any) {
	const user = ctx.state.user || {};
	const { planId } = ctx.params;
	const results = await ctx.mysql.sproc('get-plan-comments', [user.sub || null, planId]);
	ctx.body = results[0] || [];
}