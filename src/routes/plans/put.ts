
export async function putPlan(ctx: any) {
	const {name, private: isPrivate} = ctx.request.body;
	const { planId } = ctx.params;
	const { user } = ctx.state;
	try {
		await ctx.mysql.sproc('update-plan', [planId, user.sub, name, isPrivate])
		ctx.status = 204;
	} catch (e) {
		console.error(e);
		ctx.body = 'Error updating plan';
		ctx.status = 400;
	}
}
