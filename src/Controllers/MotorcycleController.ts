import { Request, Response } from 'express';
import IMotorcycleService from '../Services/interfaces/IMotorcycleService';

export default class CarController {
  private _motorcycleService: IMotorcycleService;

  constructor(carService: IMotorcycleService) {
    this._motorcycleService = carService;
  }

  public create = async (req: Request, res: Response) => {
    const newMotorcycle = await this._motorcycleService.create({ ...req.body });
    return res.status(201).json(newMotorcycle);
  };
}