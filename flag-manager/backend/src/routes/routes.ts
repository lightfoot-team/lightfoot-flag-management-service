import { Router } from 'express';
import { 
  createFlag, 
  updateFlag,
  readAllFlags, 
  readFlag, 
  deleteFlag, 
  toggleFlag, 
  createRule,
} from '../controllers/controller';

const router = Router();

router.post('/add', createFlag);

router.post('/update', updateFlag);

router.get('/all', readAllFlags);

router.get('/:flagName', readFlag);

router.delete('/:flagName', deleteFlag);

router.patch('/toggle/:flagName', toggleFlag);

router.post('/rule', createRule);

export default router;
