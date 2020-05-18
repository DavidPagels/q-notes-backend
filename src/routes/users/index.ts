import { putUser } from './put';

export default async function userRoutes(router) {
	router.put('/userLogin', putUser);
}