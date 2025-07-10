import { Router } from 'express';
import { 
  createFlag, 
  readAllFlags, 
  readFlag, 
  deleteFlag, 
  toggleFlag,
  writeTelemetry,
  readTelemetry
} from '../controllers/controller';

const router = Router();

router.post('/add', createFlag);

router.get('/all', readAllFlags);

router.get('/telemetry', readTelemetry);

router.get('/:flagName', readFlag);

router.delete('/:flagName', deleteFlag);

router.patch('/toggle/:flagName', toggleFlag);


router.post('/telemetry', writeTelemetry);



export default router;
