import { Router } from 'express';
import CarODM from '../Models/CarODM';
import Service from '../Services/CarService';
import Controller from '../Controllers/CarController';

const router = Router();
const carODM = new CarODM();
const service = new Service(carODM);
const controller = new Controller(service);

router.post('/', controller.create);
router.get('/', controller.getAllCars);
router.get('/:id', controller.getCarById);
router.put('/:id', controller.updateCarById);

export default router;