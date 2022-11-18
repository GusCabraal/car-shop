import Motorcycle from '../../Domains/Motorcycle';
import IMotorcycle from '../../Interfaces/IMotorcycle';

interface IMotorcycleService {
  createMotorcycleDomain(motorcycle: IMotorcycle): Motorcycle | null
  create(motorcycle:IMotorcycle): Promise<Motorcycle | null>
  getAllMotorcycles(): Promise<Motorcycle[]>
  getMotorcycleById(id: string): Promise<Motorcycle | null | void>
}

export default IMotorcycleService;