import expressPromise from 'express-promise-router';

import { commentController } from '../controllers';
import { authMiddleware } from '../middlewares';

const router = expressPromise();

router.route('/').post(authMiddleware.auth, commentController.addComment).get(commentController.getComments);
router
  .route('/:commentId')
  .patch(authMiddleware.auth, commentController.updateComment)
  .delete(authMiddleware.auth, commentController.deleteComment);

export const commentRoutes = router;
