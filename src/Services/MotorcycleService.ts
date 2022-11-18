import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODOM from '../Models/MotorcycleODM';

class MotorcycleService {
  createMotorcycleDomain(motorcycle: IMotorcycle | null): Motorcycle | null {
    if (motorcycle) {
      return new Motorcycle(motorcycle);
    }
    return null;
  }
    
  public async create(motorcycle: IMotorcycle): Promise<Motorcycle | null> {
    const MotorcycleODM = new MotorcycleODOM();
    const newMotorcycle = await MotorcycleODM.create(motorcycle);
    const MotorcycleTyped = this.createMotorcycleDomain(newMotorcycle);
    return MotorcycleTyped;
  }
}

export default MotorcycleService;