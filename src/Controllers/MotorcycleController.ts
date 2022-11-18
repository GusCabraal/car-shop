import { NextFunction, Request, Response } from 'express';
import IMotorcycleService from '../Services/interfaces/IMotorcycleService';

export default class MotorcycleController {
  private _motorcycleService: IMotorcycleService;

  constructor(motorcycleService: IMotorcycleService) {
    this._motorcycleService = motorcycleService;
  }

  public create = async (req: Request, res: Response) => {
    const newMotorcycle = await this._motorcycleService.create({ ...req.body });
    return res.status(201).json(newMotorcycle);
  };

  public getAllMotorcycles = async (_req: Request, res: Response) => {
    const motorcycles = await this._motorcycleService.getAllMotorcycles();
    return res.status(200).json(motorcycles);
  };
  
  public getMotorcycleById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const motorcycle = await this._motorcycleService.getMotorcycleById(id);
      return res.status(200).json(motorcycle);
    } catch (error) {
      next(error);
    }
  };
}