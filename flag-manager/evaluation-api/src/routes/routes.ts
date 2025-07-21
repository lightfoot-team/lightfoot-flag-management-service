import {Router} from 'express';
import { getFlagEvaluation } from '../controllers/controller';

const router = Router();

//TODO: check best practice for method here
router.post('/', getFlagEvaluation);

export default router;