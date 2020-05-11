import { validateOrReject } from 'class-validator'
import { Request, Response, NextFunction } from 'express'
import { plainToClass } from 'class-transformer'
import { Replace } from './Replace.entity'

export const validateReplace = async (req: Request, _: Response, next: NextFunction) => {

  const transformed = plainToClass(Replace, req.body);
  await validateOrReject(transformed);

  return next();

}
