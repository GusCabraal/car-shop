import Car from '../../Domains/Car';
import ICar from '../../Interfaces/ICar';

interface ICarService {
  createCarDomain(car: ICar): Car | null
  create(car:ICar): Promise<Car | null>
  getAllCars(): Promise<Car[]>
  getCarById(id: string): Promise<Car | null | void>
  updateCarById(id: string, car: Partial<ICar>): Promise<Car | null | void>
}

export default ICarService;