import { Request, Response } from 'express'

export const world = (_: Request, res: Response) => {
  res.send('world')
}
