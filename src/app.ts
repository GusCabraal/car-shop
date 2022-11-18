import express from 'express';
import handleErrors from './Middlewares/handleErrors';
import { CarRoutes, MotorcycleRoutes } from './Routes';

const app = express();
app.use(express.json());

app.use('/cars', CarRoutes);
app.use('/motorcycles', MotorcycleRoutes);
app.use(handleErrors);

export default app;
