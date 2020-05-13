import { config } from 'dotenv';

const envfile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env';
const envdir = process.cwd();

config({ path: `${envdir}/${envfile}` });

export const server = {
  port: process.env.PORT || 3000,
  env: process.env.NODE_ENV || 'development'
}

export const dbConnections = {
  mongo:  {
    name: 'mongo', // replace by connection name
    conn: String(process.env.DATABASE_URL),
  }
};
