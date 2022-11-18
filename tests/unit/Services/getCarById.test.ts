import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import CarODM from '../../../src/Models/CarODM';
import CarService from '../../../src/Services/CarService';
import ICar from '../../../src/Interfaces/ICar';
import Car from '../../../src/Domains/Car';
import { NotFoundError } from '../../../src/Errors';

describe('Deveria buscar um carro pelo ID', function () {
  afterEach(function () { return sinon.restore(); });
  it('Deveria buscar um carro pelo ID com SUCESSO', async function () {
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
    sinon.stub(Model, 'findById').resolves(CarOutput);

    const carODM = new CarODM();
    const service = new CarService(carODM);
    const result = await service.getCarById('6377ed11fa2ac9952871d3b9');

    expect(result).to.be.deep.equal(carTyped);
  });

  it('Deveria buscando um carro com id inexistente', async function () {
    sinon.stub(Model, 'findById').resolves(null);

    try {
      const carODM = new CarODM();
      const service = new CarService(carODM);
      await service.getCarById('6377ed11fa2ac9952871d3b9');
    } catch (error) {
      expect((error as NotFoundError).status).to.be.equal(404);
      expect((error as NotFoundError).message).to.be.equal('Car not found');
    }
  });

  it('Deveria buscando um carro com id invalido', async function () {
    sinon.stub(Model, 'findById').resolves({});

    try {
      const carODM = new CarODM();
      const service = new CarService(carODM);
      await service.getCarById('xxx');
    } catch (error) {
      expect((error as Error).message).to.be.equal('Invalid mongo id');
    }
  });
});