import { Router } from 'express';
import { signUpController } from '../controllers/userController';

const router: Router = Router();

router.post('/new', signUpController);

export default router;
