
export async function postPlan(ctx: any) {
	const {name, meatId, private: isPrivate} = ctx.request.body;
	try {
		const result = await ctx.mysql.sproc('add-plan', [ctx.state.user.sub, name, meatId, isPrivate]);
		const { newPlanId } = result[0][0];
		ctx.body = {...ctx.request.body, id: newPlanId};
		ctx.status = 200;
	} catch (e) {
		console.error(e);
		ctx.body = 'Error adding plan';
		ctx.status = 400;
	}
}

export async function postPlanAndSteps(ctx: any) {
	const {name, meatId, private: isPrivate, steps} = ctx.request.body;
	const { user } = ctx.state;
	try {
		const result = await ctx.mysql.sproc('add-plan', [user.sub, name, meatId, isPrivate]);
		const { newPlanId } = result[0][0];
		for (const step of steps) {
			await ctx.mysql.sproc('add-step', [newPlanId, user.sub, step.action]);
		}
		ctx.body = {...ctx.request.body, id: newPlanId}
		ctx.status = 200;
	} catch (e) {
		console.error(e);
		ctx.body = 'Error adding plan or steps';
		ctx.status = 400;
	}
}