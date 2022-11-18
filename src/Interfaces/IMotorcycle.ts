import IVehicle from './IVehicle';

interface IMotocycle extends IVehicle{
  category: 'Street' | 'Custom' | 'Trail';
  engineCapacity: number;
}
  
export default IMotocycle;