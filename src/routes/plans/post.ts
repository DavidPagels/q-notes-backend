
export async function postPlan(ctx: any) {
	const {name, private: isPrivate} = ctx.request.body;
	if (name) {
		try {
			console.log(ctx.userId, name, isPrivate)
			await ctx.mysql.sproc('add-plan', [ctx.userId, name, isPrivate])
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