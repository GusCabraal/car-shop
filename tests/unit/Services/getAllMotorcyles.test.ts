import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import MotorcycleODM from '../../../src/Models/MotorcycleODM';
import MotorcycleService from '../../../src/Services/MotorcycleService';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';
import Motorcycle from '../../../src/Domains/Motorcycle';

describe('Deveria buscar todas as motos cadastrados', function () {
  it('Deveria buscando todas as motos com SUCESSO', async function () {
    const MotorcycleOutput: IMotorcycle[] = [{
      id: '637925747634df585d08fee7',
      model: 'Honda Cb 600f Hornet',
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30,
      category: 'Street',
      engineCapacity: 600,
    }];
    const motorcyclesTyped = MotorcycleOutput.map((motorcycle) => new Motorcycle(motorcycle));
    sinon.stub(Model, 'find').resolves(MotorcycleOutput);

    const motorcycleODM = new MotorcycleODM();
    const service = new MotorcycleService(motorcycleODM);
    const result = await service.getAllMotorcycles();

    expect(result).to.be.deep.equal(motorcyclesTyped);

    sinon.restore();
  });
});