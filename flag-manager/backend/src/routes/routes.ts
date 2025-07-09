import { Router } from 'express';
import { createFlag } from '../controllers/controller';

const router = Router();

router.post('/add', createFlag);



export default router;
