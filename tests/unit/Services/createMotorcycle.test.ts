import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import MotorcycleODM from '../../../src/Models/MotorcycleODM';
import MotorcycleService from '../../../src/Services/MotorcycleService';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';
import Motorcycle from '../../../src/Domains/Motorcycle';

describe('Validando e criando um cotorcyclero', function () {
  it('Criando um cotorcyclero com SUCESSO', async function () {
    const MotorcycleInput: IMotorcycle = {
      model: 'Honda Cb 600f Hornet',
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
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600,
    };
    const cotorcycleTyped = new Motorcycle(MotorcycleOutput);
    sinon.stub(Model, 'create').resolves(MotorcycleOutput);

    const cotorcycleODM = new MotorcycleODM();
    const service = new MotorcycleService(cotorcycleODM);
    const result = await service.createMotorcycle(MotorcycleInput);

    expect(result).to.be.deep.equal(cotorcycleTyped);

    sinon.restore();
  });
});