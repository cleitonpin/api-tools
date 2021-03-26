import { Router } from 'express';
import AuthController from './controllers/AuthController';
// controllers
import NotFoundController from './controllers/NotFoundController';
import ToolsController from './controllers/ToolsController';
import UsersController from './controllers/UsersController';
// middleware
import authMiddleware from './middleware/authMiddleware';

const routes = Router();

routes.get('/', NotFoundController.index)

routes.post('/tools', ToolsController.create);
routes.delete('/tools/:id', ToolsController.delete);
routes.get('/tools', ToolsController.index);
routes.get('/tools/:id', ToolsController.index);


routes.post('/user', UsersController.create);
routes.get('/user', UsersController.index);

// login route authentication and authenticates
routes.post('/login', AuthController.authenticate);
routes.delete('/user/:id', authMiddleware, UsersController.delete);
routes.get('/user/profile', authMiddleware, UsersController.logged);

export default routes;