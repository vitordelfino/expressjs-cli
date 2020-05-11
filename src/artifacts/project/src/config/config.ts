/* eslint-disable import/first */
import { config } from 'dotenv';
import { ConnectionOptions } from 'typeorm';
import logger from '../middlewares/Logger';


const envfile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env';
const envdir = process.cwd();

config({ path: `${envdir}/${envfile}` });

export const server = {
  port: process.env.PORT || 3000,
  env: process.env.NODE_ENV || 'development'
}

export const dbConnections = {
  mongo:  {
    name: 'default', // replace by connection name
    config: (...entities: any) => ({
      name: 'mongo',
      type: 'mongodb', // replace with necessary by (mongodb|mysql|mssql|etc...)
      url: String(process.env.DATABASE_URL),
      entities: [...entities],
      useNewUrlParser: true,
      useUnifiedTopology: true,
      synchronize: true,
      logging: 'all',
      logger: logger as any,
    } as ConnectionOptions)
  }
};
