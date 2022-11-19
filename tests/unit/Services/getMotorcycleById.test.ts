import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import MotorcycleODM from '../../../src/Models/MotorcycleODM';
import MotorcycleService from '../../../src/Services/MotorcycleService';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';
import { NotFoundError } from '../../../src/Errors';
import Motorcycle from '../../../src/Domains/Motorcycle';

describe('Deveria buscar um carro pelo ID', function () {
  afterEach(function () { return sinon.restore(); });
  it('Deveria buscar um carro pelo ID com SUCESSO', async function () {
    const MotorcycleOutput: IMotorcycle = {
      id: '637925747634df585d08fee7',
      model: 'Honda Cb 600f Hornet',
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30,
      category: 'Street',
      engineCapacity: 600,
    };
    const motorcycleTyped = new Motorcycle(MotorcycleOutput);
    sinon.stub(Model, 'findById').resolves(MotorcycleOutput);

    const carODM = new MotorcycleODM();
    const service = new MotorcycleService(carODM);
    const result = await service.getMotorcycleById('637925747634df585d08fee7');

    expect(result).to.be.deep.equal(motorcycleTyped);
  });

  it('Deveria buscando um carro com id inexistente', async function () {
    sinon.stub(Model, 'findById').resolves(null);

    try {
      const carODM = new MotorcycleODM();
      const service = new MotorcycleService(carODM);
      await service.getMotorcycleById('6377ed11fa2ac9952871d3b9');
    } catch (error) {
      expect((error as NotFoundError).status).to.be.equal(404);
      expect((error as NotFoundError).message).to.be.equal('Motorcycle not found');
    }
  });

  it('Deveria buscando um carro com id invalido', async function () {
    sinon.stub(Model, 'findById').resolves({});

    try {
      const carODM = new MotorcycleODM();
      const service = new MotorcycleService(carODM);
      await service.getMotorcycleById('xxx');
    } catch (error) {
      expect((error as Error).message).to.be.equal('Invalid mongo id');
    }
  });
});