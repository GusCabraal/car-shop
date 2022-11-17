import express from 'express';
import handleErrors from './Middlewares/handleErrors';
import carRouter from './Routes/CarRoutes';

const app = express();
app.use(express.json());

app.use('/cars', carRouter);
app.use(handleErrors);

export default app;
