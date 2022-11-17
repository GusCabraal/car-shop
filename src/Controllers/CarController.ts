import { Request, Response } from 'express';
import ICarService from '../Services/interfaces/ICarService';

export default class CarController {
  private _carService: ICarService;

  constructor(carService: ICarService) {
    this._carService = carService;
  }

  public create = async (req: Request, res: Response) => {
    const newCar = await this._carService.create({ ...req.body });
    return res.status(201).json(newCar);
  };
}