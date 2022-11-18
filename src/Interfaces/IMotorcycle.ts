import IVehicle from './IVehicle';
import CategoryType from './CategoryType';

interface IMotocycle extends IVehicle {
  category: CategoryType;
  engineCapacity: number;
}
  
export default IMotocycle;