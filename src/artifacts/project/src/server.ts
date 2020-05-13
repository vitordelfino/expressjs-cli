/* eslint-disable global-require */
import Logger from './middlewares/Logger';
import { server } from './config/config';
import connection from './config/db/standart.connection'

connection.then(() => {
  const app = require('./app').default
  app.listen(server.port, () => {
    Logger.info('Server running', { port: server.port, mode: server.env });
  });
});
