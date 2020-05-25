
export async function putUser(ctx: any) {
	const user = ctx.request.body;
	try {
		await ctx.mysql.sproc('upsert-user', [
			user.sub, 
			user.name || null, 
			user.given_name || null, 
			user.family_name || null, 
			user.middle_name || null, 
			user.nickname || null,
			user.preferred_username || null,
			user.email || null,
			user.email_verified || null,
			user.gender || null,
			user.birthdate || null,
			user.zoneinfo || null,
			user.locale || null
		])
		ctx.status = 204;
	} catch (e) {
		console.error(e);
		ctx.body = 'Error updating user';
		ctx.status = 400;
	}
}