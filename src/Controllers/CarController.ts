import { NextFunction, Request, Response } from 'express';
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

  public getCarById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const car = await this._carService.getCarById(id);
      return res.status(200).json(car);
    } catch (error) {
      next(error);
    }
  };

  public getAllCars = async (_req: Request, res: Response) => {
    const cars = await this._carService.getAllCars();
    return res.status(200).json(cars);
  };
}