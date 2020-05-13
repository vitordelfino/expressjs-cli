import { createConnections } from 'typeorm';
import { Replace } from '../../apps/Replace/Replace.entity';
import { dbConnections } from '../config';

const connection = createConnections([
  {
    name: dbConnections.mongo.name,
    type: 'mongodb', // replace with necessary by (mongodb|mysql|mssql|etc...)
    url: dbConnections.mongo.conn,
    entities: [Replace],
    useNewUrlParser: true,
    useUnifiedTopology: true,
    synchronize: true,
  },
]);

export default connection;
