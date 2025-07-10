import {Router} from 'express';
import { evaluateFlagWithContext } from '../controllers/controller';

const router = Router();

//TODO: check best practice for method here
router.post('/', evaluateFlagWithContext);

export default router;