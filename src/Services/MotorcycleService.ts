import Motorcycle from '../Domains/Motorcycle';
import { NotFoundError } from '../Errors';
import IMotorcycle from '../Interfaces/IMotorcycle';
import AbstractService from './AbstractService';

class MotorcycleService extends AbstractService<IMotorcycle> {
  createDomain(motorcycle: IMotorcycle): Motorcycle {
    return new Motorcycle(motorcycle);
  }
    
  public async createMotorcycle(motorcycle: IMotorcycle): Promise<Motorcycle> {
    const newMotorcycle = await this.create(motorcycle);

    if (!newMotorcycle) throw new Error('Deu ruim');

    const MotorcycleTyped = this.createDomain(newMotorcycle);
    return MotorcycleTyped;
  }

  public async getAllMotorcycles(): Promise<Motorcycle[]> {
    const motorcycles = await this.getAll();
    const motorcyclesTyped = motorcycles
      .map((motorcycle) => this.createDomain(motorcycle));
    return motorcyclesTyped;
  }

  public async getMotorcycleById(id: string): Promise<Motorcycle | void> {
    const motorcycle = await this.getById(id);

    if (!motorcycle) throw new NotFoundError('Motorcycle not found');
    
    const motorcycleTyped = this.createDomain(motorcycle);
    return motorcycleTyped;
  }

  public async updateMotorcycleById(id: string, obj: IMotorcycle): Promise<Motorcycle | void> {
    const motorcycle = await this.getById(id);
    if (!motorcycle) throw new NotFoundError('Motorcycle not found');

    const newMotorcycle = await this.update(id, obj);
    const motorcycleTyped = this.createDomain(newMotorcycle);
    return motorcycleTyped;
  }
}

export default MotorcycleService;