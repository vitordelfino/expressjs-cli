import { Router } from 'express';
import * as controller from './HelloController';

const route = Router();

route.get('/', controller.world);

export default route;
