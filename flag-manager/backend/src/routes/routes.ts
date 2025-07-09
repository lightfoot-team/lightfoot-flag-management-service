import {Router} from 'express';
import { createFlag} from '../controllers/controller';

const router = Router();

router.post('/', createFlag);



export default router;
