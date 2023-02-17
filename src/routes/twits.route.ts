import expressPromise from 'express-promise-router';

import { twitController } from '../controllers';
import { authMiddleware } from '../middlewares';

const router = expressPromise();

router.route('/').post(authMiddleware.auth, twitController.postTwit).get(twitController.getAllTwits);

export const twitRoutes = router;
