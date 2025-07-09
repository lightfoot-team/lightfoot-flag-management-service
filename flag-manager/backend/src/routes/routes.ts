import { Router } from 'express';
import { createFlag, readAllFlags, deleteFlag } from '../controllers/controller';

const router = Router();

router.post('/add', createFlag);

router.get('/all', readAllFlags);

router.delete('/delete/:flagName', deleteFlag);



export default router;
