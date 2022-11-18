import { Router } from 'express';
import Service from '../Services/MotorcycleService';
import Controller from '../Controllers/MotorcycleController';

const router = Router();
const service = new Service();
const controller = new Controller(service);

router.post('/', controller.create);
router.get('/', controller.getAllMotorcycles);
router.get('/:id', controller.getMotorcycleById);

export default router;