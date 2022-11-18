import IMotorcycle from '../Interfaces/IMotorcycle';

class Car {
  protected id: string | undefined;
  protected model: string;
  protected year: number;
  protected color: string;
  protected status: boolean;
  protected buyValue: number;
  private category: 'Street' | 'Custom' | 'Trail';
  private engineCapacity: number;
  
  constructor(motorcycle:IMotorcycle) {
    this.id = motorcycle.id;
    this.model = motorcycle.model;
    this.year = motorcycle.year;
    this.color = motorcycle.color;
    this.status = motorcycle.status || false;
    this.buyValue = motorcycle.buyValue;
    this.category = motorcycle.category;
    this.engineCapacity = motorcycle.engineCapacity;
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
}
  
export default Car;