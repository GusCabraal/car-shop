import { Router } from 'express';
import Service from '../Services/CarService';
import Controller from '../Controllers/CarController';

const router = Router();
const service = new Service();
const controller = new Controller(service);

router.post('/', controller.create);
router.get('/', controller.getAllCars);
router.get('/:id', controller.getCarById);
router.put('/:id', controller.updateCarById);

export default router;