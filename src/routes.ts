import { Router } from 'express';
import MessageController from './controllers/MessageController';
import SettingsController from './controllers/SettingsController';
import UsersController from './controllers/UsersController';

const routes = Router();

routes.post('/settings', SettingsController.GetInstance().create);
routes.post('/users', UsersController.GetInstance().create);
routes.post('/messages', MessageController.GetInstance().create);
routes.get('/messages/:user_id', MessageController.GetInstance().showByUser);

routes.get('/', (req, res) => {
	res.status(200);
	res.json({ msg: 'Running' });
});
export default routes;
