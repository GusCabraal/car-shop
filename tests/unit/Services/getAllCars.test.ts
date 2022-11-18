import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import CarODM from '../../../src/Models/CarODM';
import CarService from '../../../src/Services/CarService';
import ICar from '../../../src/Interfaces/ICar';
import Car from '../../../src/Domains/Car';

describe('Deveria buscar todos os carros cadastrados', function () {
  it('Deveria buscando todos os carros com SUCESSO', async function () {
    const CarOutput: ICar[] = [{
      id: '6377ed11fa2ac9952871d3b9',
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.99,
      doorsQty: 4,
      seatsQty: 5,
    }];
    const carsTyped = CarOutput.map((car) => new Car(car));
    sinon.stub(Model, 'find').resolves(CarOutput);

    const carODM = new CarODM();
    const service = new CarService(carODM);
    const result = await service.getAllCars();

    expect(result).to.be.deep.equal(carsTyped);

    sinon.restore();
  });
});