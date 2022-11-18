import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import CarODM from '../../../src/Models/CarODM';
import CarService from '../../../src/Services/CarService';
import ICar from '../../../src/Interfaces/ICar';
import Car from '../../../src/Domains/Car';
import { NotFoundError } from '../../../src/Errors';

describe('Deveria atualizar um carro pelo ID', function () {
  afterEach(function () { return sinon.restore(); });
  it('Deveria atualizar um carro pelo ID com SUCESSO', async function () {
    const CarInput: ICar = {
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.99,
      doorsQty: 4,
      seatsQty: 5,
    };
    const OldCarOutput: ICar = {
      id: '6377ed11fa2ac9952871d3b9',
      model: 'Marea',
      year: 1992,
      color: 'Red',
      status: true,
      buyValue: 12.000,
      doorsQty: 2,
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
    sinon.stub(Model, 'findOne').resolves(OldCarOutput);
    sinon.stub(Model, 'findOneAndUpdate').resolves(CarOutput);

    const carODM = new CarODM();
    const service = new CarService(carODM);
    const result = await service.updateCarById('6377ed11fa2ac9952871d3b9', CarInput);

    expect(result).to.be.deep.equal(carTyped);
  });

  it('Tentando atualizar um carro com id inexistente', async function () {
    const CarInput: ICar = {
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.99,
      doorsQty: 4,
      seatsQty: 5,
    };
    sinon.stub(Model, 'findOne').resolves(null);
    sinon.stub(Model, 'findOneAndUpdate').resolves({});

    try {
      const carODM = new CarODM();
      const service = new CarService(carODM);
      await service.updateCarById('6377ed11fa2ac9952871d3b1', CarInput);
    } catch (error) {
      expect((error as NotFoundError).status).to.be.equal(404);
      expect((error as NotFoundError).message).to.be.equal('Car not found');
    }
  });
});