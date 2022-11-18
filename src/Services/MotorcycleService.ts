import Motorcycle from '../Domains/Motorcycle';
import { NotFoundError } from '../Errors';
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

  public async getAllMotorcycles(): Promise<Motorcycle[]> {
    const motorcycleODM = new MotorcycleODOM();
    const motorcycles = await motorcycleODM.getAll();

    const motorcyclesTyped = motorcycles
      .map((motorcycle) => this.createMotorcycleDomain(motorcycle));
    return motorcyclesTyped as Motorcycle[];
  }

  public async getMotorcycleById(id: string): Promise<Motorcycle | null | void> {
    const motorcycleODM = new MotorcycleODOM();
    const motorcycle = await motorcycleODM.getById(id);

    if (!motorcycle) throw new NotFoundError('Motorcycle not found');
    
    const motorcycleTyped = this.createMotorcycleDomain(motorcycle);
    return motorcycleTyped;
  }
}

export default MotorcycleService;