import { Request, Response } from 'express'
import ReplaceService from './ReplaceService'

export const list = async (_: Request, res: Response) => {
  const response = await ReplaceService.list()
  res.json(response);
}

export const create = async (req: Request, res: Response) => {
  const response = await ReplaceService.create(req.body);
  res.json(response)
}

export const findOne = async (req: Request, res: Response) => {
  const { id } = req.params
  const response = await ReplaceService.findOne(id);
  res.json(response)
}

export const update = async (req: Request, res: Response) => {
  const { id } = req.params
  const response = await ReplaceService.update(id, req.body);
  res.json(response)
}

export const deleteOne = async (req: Request, res: Response) => {
  const { id } = req.params
  const response = await ReplaceService.delete(id);
  res.json(response)
}
