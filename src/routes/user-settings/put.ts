
export async function putUserSettings(ctx: any) {
	const { theme = null, heaterMeterUrl = null } = ctx.request.body;
	const { user } = ctx.state;
	try { 
		await ctx.mysql.sproc('upsert-user-settings', [user.sub, theme, heaterMeterUrl]);
		ctx.status = 204;
	} catch (e) {
		console.error(e);
		ctx.body = 'Error updating user settings';
		ctx.status = 400;
	}
}