import { Repository , getConnection} from 'typeorm';


export function connection<T>(Type: { new(): T }, connectionName: string): Repository<T> {
  return getConnection(connectionName).getRepository(Type)
}
