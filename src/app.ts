import express from 'express';
import itemRoutes from './routes/routes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(express.json());

// Routes
app.use('/api/items', itemRoutes);

// Use errorHandler middleware for all routes 
app.use(errorHandler);

export default app;
