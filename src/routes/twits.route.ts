import expressPromise from 'express-promise-router';

import { twitController } from '../controllers';
import { authMiddleware } from '../middlewares';

const router = expressPromise();

router.route('/').post(authMiddleware.auth, twitController.postTwit).get(twitController.getAllTwit);

router
  .route('/:id')
  .get(twitController.getTwit)
  .delete(authMiddleware.auth, twitController.deleteTwit)
  .patch(authMiddleware.auth, twitController.updateTwit);

router.route('/user/:userId').get(twitController.getTwitsOfUser);

export const twitRoutes = router;
