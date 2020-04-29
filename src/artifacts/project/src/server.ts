import Logger from './middlewares/Logger';
import { server } from './config/config';
import app from './app';

app.listen(server.port, () => {
  Logger.info('Server running', { port: server.port, mode: server.env });
});
