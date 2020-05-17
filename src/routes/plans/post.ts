
export async function postPlan(ctx: any) {
	const {name, private: isPrivate} = ctx.request.body;
	if (name) {
		try {
			await ctx.mysql.sproc('add-plan', [ctx.state.user.sub, name, isPrivate])
			ctx.status = 204;
		} catch (e) {
			console.error(e);
			ctx.body = 'Error adding plan';
			ctx.status = 400;
		}
	} else {
		ctx.body = 'Missing name for new plan'
		ctx.status = 422;
	}
}