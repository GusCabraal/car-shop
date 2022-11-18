import { NextFunction, Request, Response } from 'express';
import IMotorcycleService from '../Services/interfaces/IMotorcycleService';

export default class MotorcycleController {
  private _motorcycleService: IMotorcycleService;

  constructor(motorcycleService: IMotorcycleService) {
    this._motorcycleService = motorcycleService;
  }

  public createMotorcycle = async (req: Request, res: Response) => {
    const newMotorcycle = await this._motorcycleService.createMotorcycle({ ...req.body });
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

  public updateMotorcycleById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { params: { id }, body } = req;
      const car = await this._motorcycleService.updateMotorcycleById(id, body);
      return res.status(200).json(car);
    } catch (error) {
      next(error);
    }
  };
}