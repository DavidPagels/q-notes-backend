import { putUser } from './put';

export default async function planRoutes(router) {
	router.put('/userLogin', putUser);
}