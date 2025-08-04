import { Router } from 'express';
import { 
  createFlag, 
  updateFlag,
  readAllFlags, 
  readFlag, 
  deleteFlag, 
  toggleFlag, 
  createRule,
  getRulesByFlagKey,
  deleteRule
} from '../controllers/controller';

const router = Router();

router.post('/add', createFlag);

router.post('/update', updateFlag);

router.get('/all', readAllFlags);

router.get('/rules/:flagKey', getRulesByFlagKey);

router.get('/:flagName', readFlag);

router.delete('/:flagName', deleteFlag);

router.patch('/toggle/:flagName', toggleFlag);

router.post('/rule', createRule);

router.delete('/rule/:id', deleteRule);

export default router;
