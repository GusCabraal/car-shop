import Car from '../../Domains/Car';
import ICar from '../../Interfaces/ICar';

interface ICarService {
  createCarDomain(car: ICar): Car
  createCar(car:ICar): Promise<Car | null>
  getAllCars(): Promise<Car[]>
  getCarById(id: string): Promise<Car | void>
  updateCarById(id: string, car: Partial<ICar>): Promise<Car | void>
}

export default ICarService;