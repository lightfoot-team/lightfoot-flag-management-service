import { Router } from 'express';
import { createFlag, readAllFlags, deleteFlag, toggleFlag } from '../controllers/controller';

const router = Router();

router.post('/add', createFlag);

router.get('/all', readAllFlags);

router.delete('/:flagName', deleteFlag);

router.patch('/toggle/:flagName', toggleFlag);


export default router;
