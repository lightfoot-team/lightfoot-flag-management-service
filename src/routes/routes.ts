import {Router} from 'express';
import { createSomething} from '../controllers/controller';

const router = Router();

router.post('/', createSomething);


export default router;