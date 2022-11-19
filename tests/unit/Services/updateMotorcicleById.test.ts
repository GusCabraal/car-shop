import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import MotorcycleODM from '../../../src/Models/MotorcycleODM';
import MotorcycleService from '../../../src/Services/MotorcycleService';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';
import { NotFoundError } from '../../../src/Errors';
import Motorcycle from '../../../src/Domains/Motorcycle';

describe('Deveria atualizar um carro pelo ID', function () {
  afterEach(function () { return sinon.restore(); });
  it('Deveria atualizar um carro pelo ID com SUCESSO', async function () {
    const MotorcycleInput: IMotorcycle = {
      model: 'Honda Cb 600f Hornet',
      year: 2014,
      color: 'Red',
      status: true,
      buyValue: 45.000,
      category: 'Street',
      engineCapacity: 600,
    };
    const OldMotorcycleOutput: IMotorcycle = {
      id: '6377ed11fa2ac9952871d3b9',
      model: 'Honda Cb 600 Hornet',
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600,
    };
    const MotorcycleOutput: IMotorcycle = {
      id: '6377ed11fa2ac9952871d3b9',
      model: 'Honda Cb 600f Hornet',
      year: 2014,
      color: 'Red',
      status: true,
      buyValue: 45.000,
      category: 'Street',
      engineCapacity: 600,
    };
    const carTyped = new Motorcycle(MotorcycleOutput);
    sinon.stub(Model, 'findOne').resolves(OldMotorcycleOutput);
    sinon.stub(Model, 'findOneAndUpdate').resolves(MotorcycleOutput);

    const carODM = new MotorcycleODM();
    const service = new MotorcycleService(carODM);
    const result = await service.updateMotorcycleById('6377ed11fa2ac9952871d3b9', MotorcycleInput);

    expect(result).to.be.deep.equal(carTyped);
  });

  it('Tentando atualizar um carro com id inexistente', async function () {
    const MotorcycleInput: IMotorcycle = {
      model: 'Honda Cb 600 Hornet',
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600,
    };
    sinon.stub(Model, 'findOne').resolves(null);
    sinon.stub(Model, 'findOneAndUpdate').resolves({});

    try {
      const carODM = new MotorcycleODM();
      const service = new MotorcycleService(carODM);
      await service.updateMotorcycleById('6377ed11fa2ac9952871d3b1', MotorcycleInput);
    } catch (error) {
      expect((error as NotFoundError).status).to.be.equal(404);
      expect((error as NotFoundError).message).to.be.equal('Motorcycle not found');
    }
  });
});