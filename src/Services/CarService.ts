import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODOM from '../Models/CarODM';

class CarService {
  createCarDomain(car: ICar): Car | null {
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
}

export default CarService;