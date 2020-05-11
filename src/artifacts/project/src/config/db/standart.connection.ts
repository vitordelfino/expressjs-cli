import { createConnections } from 'typeorm';
import { Replace } from "../../apps/Replace/Replace.entity"
import { dbConnections } from "../config";

const connection = createConnections([
  dbConnections.mongo.config(Replace)
]);

export default connection;
