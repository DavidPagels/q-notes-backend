export async function getUserSettings(ctx: any) {
	const { user } = ctx.state;
	const settingsResults = await ctx.mysql.sproc('get-user-settings', [user.sub]);
	ctx.body = settingsResults[0].length ? settingsResults[0][0] : {};
}