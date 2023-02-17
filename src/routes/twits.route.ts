import expressPromise from 'express-promise-router';

import { twitController } from '../controllers';

const router = expressPromise();

// router.route('/register').post(authController.register);
// router.route('/login').post(authController.login);

export const twitRoutes = router;
