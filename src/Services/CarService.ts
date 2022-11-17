import Car from '../Domains/Car';
import { NotFoundError } from '../Errors';
import ICar from '../Interfaces/ICar';
import CarODOM from '../Models/CarODM';

class CarService {
  createCarDomain(car: ICar | null): Car | null {
    if (car) {
      return new Car(car);
    }
    return null;
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
    return carsTyped as Car[];
  }

  public async getCarById(id: string): Promise<Car | null | void> {
    const carODM = new CarODOM();
    const car = await carODM.getCarById(id);

    if (!car) throw new NotFoundError('Car not found');
    
    const carTyped = this.createCarDomain(car);
    return carTyped;
  }

  public async updateCarById(id: string, obj: ICar): Promise<Car | null | void> {
    // if (id.length !== 24) throw new UnprocessableError('Invalid mongo id');
    
    const carODM = new CarODOM();
    const car = await carODM.getCarById(id);
    if (!car) throw new NotFoundError('Car not found');

    const newCar = await carODM.update(id, obj);
    const carTyped = this.createCarDomain(newCar);
    return carTyped;
  }
}

export default CarService;