import CategoryType from '../Interfaces/CategoryType';
import IMotorcycle from '../Interfaces/IMotorcycle';
import Vehicle from './Vehicle';

class Motorcycle extends Vehicle {
  private category: CategoryType;
  private engineCapacity: number;
  
  constructor(motorcycle:IMotorcycle) {
    super(motorcycle);

    this.category = motorcycle.category;
    this.engineCapacity = motorcycle.engineCapacity;
  }
}
  
export default Motorcycle;