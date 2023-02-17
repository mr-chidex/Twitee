import { Router } from 'express';

import { authController } from '../controllers';

const router = Router();

router.route('/register').post(authController.register);

export const authRoutes = router;
