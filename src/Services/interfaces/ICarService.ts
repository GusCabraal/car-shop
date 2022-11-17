import Car from '../../Domains/Car';
import ICar from '../../Interfaces/ICar';

interface ICarService {
  createCarDomain(car: ICar): Car | null
  create(car:ICar): Promise<Car | null>
}

export default ICarService;