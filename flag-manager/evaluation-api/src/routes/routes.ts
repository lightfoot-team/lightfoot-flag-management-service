import {Router} from 'express';
import { getFlagEvaluation, getFlagEvaluationConfig } from '../controllers/controller';

const router = Router();


router.post('/', getFlagEvaluation);
router.post('/config', getFlagEvaluationConfig)
export default router;