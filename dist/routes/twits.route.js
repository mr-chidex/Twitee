"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.twitRoutes = void 0;
const express_promise_router_1 = __importDefault(require("express-promise-router"));
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const router = (0, express_promise_router_1.default)();
router.route('/').post(middlewares_1.authMiddleware.auth, controllers_1.twitController.postTwit).get(controllers_1.twitController.getAllTwit);
router
    .route('/:id')
    .get(controllers_1.twitController.getTwit)
    .delete(middlewares_1.authMiddleware.auth, controllers_1.twitController.deleteTwit)
    .patch(middlewares_1.authMiddleware.auth, controllers_1.twitController.updateTwit);
router.route('/user/:userId').get(controllers_1.twitController.getTwitsOfUser);
router.route('/likes/:twitId').get(middlewares_1.authMiddleware.auth, controllers_1.twitController.likeAndUnlikeTwit);
exports.twitRoutes = router;
