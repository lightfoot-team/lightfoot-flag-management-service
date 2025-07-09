import express from 'express';
import routes from './routes/routes';
import { errorHandler } from './middlewares/errorHandler';
const cors = require('cors');
const app = express();

app.use(express.json());

app.use(cors())

// Routes
app.use('/api/flags', routes);

// Use errorHandler middleware for all routes 
app.use(errorHandler);

export default app;
