import { getUserSettings } from './get';
import { putUserSettings } from './put';

export default async function userSettingsRoutes(router) {
	router.get('/users/settings', getUserSettings);
	router.put('/users/settings', putUserSettings);
}
