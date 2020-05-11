import { Router } from 'express';
import replaceRoute from './apps/Replace/routes';

const routes = Router();

routes.use('/replace', replaceRoute);

export default routes
