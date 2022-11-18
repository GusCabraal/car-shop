import IVehicle from '../Interfaces/IVehicle';

abstract class Vehicle {
  protected id: string | undefined;
  protected model: string;
  protected year: number;
  protected color: string;
  protected status: boolean;
  protected buyValue: number;
  
  constructor(vehicle:IVehicle) {
    this.id = vehicle.id;
    this.model = vehicle.model;
    this.year = vehicle.year;
    this.color = vehicle.color;
    this.status = vehicle.status || false;
    this.buyValue = vehicle.buyValue;
  }
  
  public getModel() {
    return this.model;
  }
  
  public setModel(model: string) {
    this.model = model;
  }
  
  public getYear() {
    return this.year;
  }
  
  public setYear(year: number) {
    this.year = year;
  }
  
  public getColor() {
    return this.color;
  }
  
  public setColor(color: string) {
    this.color = color;
  }

  public getBuyValue() {
    return this.buyValue;
  }
  
  public setBuyValue(buyValue: number) {
    this.buyValue = buyValue;
  }

  public getStatus() {
    return this.status;
  }
  
  public setStatus(status: boolean) {
    this.status = status;
  }
}
  
export default Vehicle;