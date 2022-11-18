import { Router } from 'express';
import MotorcycleODM from '../Models/MotorcycleODM';
import Service from '../Services/MotorcycleService';
import Controller from '../Controllers/MotorcycleController';

const router = Router();
const motorcycleODM = new MotorcycleODM();
const service = new Service(motorcycleODM);
const controller = new Controller(service);

router.post('/', controller.createMotorcycle);
router.get('/', controller.getAllMotorcycles);
router.get('/:id', controller.getMotorcycleById);
router.put('/:id', controller.updateMotorcycleById);

export default router;