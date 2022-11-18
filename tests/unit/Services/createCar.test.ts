import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import CarODM from '../../../src/Models/CarODM';
import CarService from '../../../src/Services/CarService';
import ICar from '../../../src/Interfaces/ICar';
import Car from '../../../src/Domains/Car';

describe('Validando e criando um carro', function () {
  it('Criando um carro com SUCESSO', async function () {
    const CarInput: ICar = {
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.99,
      doorsQty: 4,
      seatsQty: 5,
    };
    const CarOutput: ICar = {
      id: '6377ed11fa2ac9952871d3b9',
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.99,
      doorsQty: 4,
      seatsQty: 5,
    };
    const carTyped = new Car(CarOutput);
    sinon.stub(Model, 'create').resolves(CarOutput);

    const carODM = new CarODM();
    const service = new CarService(carODM);
    const result = await service.createCar(CarInput);

    expect(result).to.be.deep.equal(carTyped);

    sinon.restore();
  });
});