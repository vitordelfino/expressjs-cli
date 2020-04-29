import { Router } from 'express';
import helloRoute from './apps/Hello/routes';

const routes = Router();

routes.use('/hello', helloRoute);

export default routes
