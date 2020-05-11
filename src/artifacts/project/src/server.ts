import Logger from './middlewares/Logger';
import { server } from './config/config';
import connection from './config/db/standart.connection'
import app from './app';

connection.then(() => {
  app.listen(server.port, () => {
    Logger.info('Server running', { port: server.port, mode: server.env });
  });
});
