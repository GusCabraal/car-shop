import Motorcycle from '../../Domains/Motorcycle';
import IMotorcycle from '../../Interfaces/IMotorcycle';

interface IMotorcycleService {
  createDomain(motorcycle: IMotorcycle): Motorcycle | null
  createMotorcycle(motorcycle:IMotorcycle): Promise<Motorcycle>
  getAllMotorcycles(): Promise<Motorcycle[]>
  getMotorcycleById(id: string): Promise<Motorcycle | void>
  updateMotorcycleById(id: string, car: Partial<IMotorcycle>): Promise<Motorcycle | void>

}

export default IMotorcycleService;