import express, { Application } from 'express';
import offerRoutes from './routes/offer.route';

const app: Application = express();

app.use(express.json());
app.use('/api', offerRoutes);

export default app;
