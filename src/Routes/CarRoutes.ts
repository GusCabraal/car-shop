import { Router } from 'express';
import CarService from '../Services/CarService';
import CarController from '../Controllers/CarController';

const router = Router();
const carService = new CarService();
const carController = new CarController(carService);

router.post('/', carController.create);

export default router;