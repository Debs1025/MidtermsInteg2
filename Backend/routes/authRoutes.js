import { Router } from 'express';
import { register, verifyEmail } from '../controllers/authController.js';
import { registerValidators } from '../validators/authValidators.js';
import { validateRequest } from '../validators/validateRequest.js';

const router = Router();

router.post('/register', registerValidators, validateRequest, register);
router.get('/verify-email', verifyEmail);

export default router;


