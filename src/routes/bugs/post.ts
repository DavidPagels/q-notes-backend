
export async function postBug(ctx: any) {
	const { feedback } = ctx.request.body;
	const { user } = ctx.state;
	try {
		await ctx.mysql.sproc('add-bug', [user.sub, feedback]);
		ctx.status = 204;
	} catch (e) {
		console.error(e);
		ctx.body = 'Error adding bug';
		ctx.status = 400;
	}
}