import { isValidObjectId, Schema, UpdateQuery } from 'mongoose';
import { UnprocessableError } from '../Errors';
import ICar from '../Interfaces/ICar';
import AbstractODM from './AbstractODM';

class CarODM extends AbstractODM<ICar> {
  constructor() {
    const schema = new Schema<ICar>({
      model: { type: String, required: true },
      year: { type: Number, required: true },
      color: { type: String, required: true },
      status: { type: Boolean, required: false },
      buyValue: { type: Number, required: true },
      doorsQty: { type: Number, required: true },
      seatsQty: { type: Number, required: true },
    });
    super(schema, 'Car');
  }

  public async getCarById(id: string): Promise<ICar | null> {
    if (!isValidObjectId(id)) throw new UnprocessableError('Invalid mongo id');
    
    return this.model.findById(id);
  }

  public async getAllCars(): Promise<ICar[]> {
    return this.model.find({});
  }

  public async update(_id: string, obj: Partial<ICar>): Promise<ICar | null> {
    if (!isValidObjectId(_id)) throw new UnprocessableError('Invalid mongo id');
    
    return this.model.findByIdAndUpdate(
      { _id },
      { ...obj } as UpdateQuery<ICar>,
      { new: true },
    );
  }
}

export default CarODM;