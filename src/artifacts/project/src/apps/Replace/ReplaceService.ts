import { Repository, DeleteResult } from 'typeorm'
import { plainToClass } from 'class-transformer';
import { CustomError } from 'express-handler-errors';
import { dbConnections } from "../../config/config"
import { Replace } from './Replace.entity';
import { connection } from '../../helper/getConnection';

class ReplaceService {

  private readonly repository!: Repository<Replace>

  constructor() {
    this.repository = connection(Replace, dbConnections.mongo.name);
  }

  async list(): Promise<Replace[]> {
    return this.repository.find()
  }

  async create(obj: Replace): Promise<Replace> {
    const data = plainToClass(Replace, obj)
    return this.repository.save(data)
  }

  async findOne(id: string): Promise<Replace> {
    const data = await this.repository.findOne(id)
    if(!data) throw new CustomError({
      code: 'REPLACE_NOT_FOUND',
      message: 'Replace not found',
      status: 404
    })
    return data
  }

  async update(id: string, obj: Replace): Promise<Replace> {

    await this.repository.update(id, obj);
    return this.findOne(id);

  }

  async delete(id: string): Promise<DeleteResult> {
    await this.findOne(id)
    return this.repository.delete(id);
  }

}

export default new ReplaceService()
