import Car from '../Domains/Car';
import { NotFoundError } from '../Errors';
import ICar from '../Interfaces/ICar';
import AbstractService from './AbstractService';

class CarService extends AbstractService<ICar> {
  createCarDomain(car: ICar): Car {
    return new Car(car);
  }
    
  public async createCar(car: ICar): Promise<Car | null> {
    const newCar = await this.create(car);

    const carTyped = this.createCarDomain(newCar);
    return carTyped;
  }

  public async getAllCars(): Promise<Car[]> {
    const cars = await this.getAll();
  
    const carsTyped = cars.map((car) => this.createCarDomain(car));
    return carsTyped;
  }

  public async getCarById(id: string): Promise<Car | void> {
    const car = await this.getById(id);

    if (!car) throw new NotFoundError('Car not found');
    
    const carTyped = this.createCarDomain(car);
    return carTyped;
  }

  public async updateCarById(id: string, obj: ICar): Promise<Car | void> {
    const car = await this.getById(id);
    if (!car) throw new NotFoundError('Car not found');

    const newCar = await this.update(id, obj);
    const carTyped = this.createCarDomain(newCar);
    return carTyped;
  }
}

export default CarService;