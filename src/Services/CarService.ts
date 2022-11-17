import Car from '../Domains/Car';
import { NotFoundError, UnprocessableError } from '../Errors';
import ICar from '../Interfaces/ICar';
import CarODOM from '../Models/CarODM';

class CarService {
  createCarDomain(car: ICar): Car {
    return new Car(car);
  }
    
  public async create(car: ICar): Promise<Car | null> {
    const carODM = new CarODOM();
    const newCar = await carODM.create(car);
    const carTyped = this.createCarDomain(newCar);
    return carTyped;
  }

  public async getAllCars(): Promise<Car[]> {
    const carODM = new CarODOM();
    const cars = await carODM.getAllCars();

    const carsTyped = cars.map((car) => this.createCarDomain(car));
    return carsTyped;
  }

  public async getCarById(id: string): Promise<Car | void> {
    if (id.length !== 24) throw new UnprocessableError('Invalid mongo id');
    
    const carODM = new CarODOM();
    const car = await carODM.getCarById(id);

    if (!car) throw new NotFoundError('Car not found');
    
    const carTyped = this.createCarDomain(car);
    return carTyped;
  }
}

export default CarService;