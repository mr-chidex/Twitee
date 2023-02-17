"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.twitService = void 0;
const prisma_1 = require("../prisma");
const utils_1 = require("../utils");
const validators_1 = require("../validators");
class TwitService {
    addTwit(user, body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.validatePostedTwit(body);
            const { twit } = body;
            const newTwit = yield prisma_1.Prisma.twit.create({
                data: { twit, userId: user.id },
            });
            return {
                success: true,
                message: 'Twit posted successfully',
                data: { twit: newTwit },
            };
        });
    }
    validatePostedTwit(twit) {
        const { error } = (0, validators_1.validateTWit)(twit);
        if (error) {
            (0, utils_1.errorResponse)(error.details[0].message, 400);
        }
    }
    getTwits() {
        return __awaiter(this, void 0, void 0, function* () {
            const twits = yield prisma_1.Prisma.twit.findMany({
                include: {
                    user: {
                        select: { name: true, email: true },
                    },
                    likes: true,
                    comments: true,
                },
                where: { type: prisma_1.TwitType.TWIT },
            });
            return {
                success: true,
                message: 'success',
                data: twits,
            };
        });
    }
    getTwit(twitId) {
        return __awaiter(this, void 0, void 0, function* () {
            const twitID = this.validateId(twitId);
            const twit = yield prisma_1.Prisma.twit.findFirst({
                where: { id: twitID },
                include: {
                    user: {
                        select: { name: true, email: true },
                    },
                    likes: true,
                    comments: true,
                },
            });
            return {
                success: true,
                message: 'success',
                data: twit,
            };
        });
    }
    validateId(id) {
        if (!id) {
            (0, utils_1.errorResponse)('invalid id', 400);
        }
        const twitId = parseInt(id);
        if (!twitId) {
            (0, utils_1.errorResponse)('invalid id', 400);
        }
        return twitId;
    }
    getAllTwitOfAUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const userID = this.validateId(userId);
            const twits = yield prisma_1.Prisma.twit.findMany({
                include: {
                    user: {
                        select: { name: true, email: true },
                    },
                    likes: true,
                    comments: true,
                },
                where: { type: prisma_1.TwitType.TWIT, userId: userID },
            });
            userID;
            return {
                success: true,
                message: 'success',
                data: twits,
            };
        });
    }
    deleteTwit(user, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const twitId = this.validateId(id);
            // get twit if it belongs to user
            const twit = yield prisma_1.Prisma.twit.findFirst({
                where: { id: twitId, userId: user.id },
            });
            if (!twit) {
                return (0, utils_1.errorResponse)('Not authorized to delete this twit: Forbidden', 403);
            }
            yield prisma_1.Prisma.twit.delete({
                where: { id: twitId },
            });
            return {
                success: true,
                message: 'Twit successfully deleted',
            };
        });
    }
    updateTwit(user, id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const twitId = this.validateId(id);
            this.validatePostedTwit(body);
            const { twit } = body;
            // get twit if it belongs to user
            const isExist = yield prisma_1.Prisma.twit.findFirst({
                where: { id: twitId, userId: user.id },
            });
            if (!isExist) {
                return (0, utils_1.errorResponse)('Not authorized to update this twit: Forbidden', 403);
            }
            const updatedTwit = yield prisma_1.Prisma.twit.update({
                where: {
                    id: twitId,
                },
                data: {
                    twit,
                },
            });
            return {
                success: true,
                message: 'Twit successfully updated',
                data: { twit: updatedTwit },
            };
        });
    }
    likeOrUnlikeTwit(iid) {
        return __awaiter(this, void 0, void 0, function* () {
            const twitId = this.validateId(id);
            const twit = yield prisma_1.Prisma.twit.findFirst({ where: { id: twitId } });
            if (!twit) {
                return (0, utils_1.errorResponse)('twitnot found', 404);
            }
            // check if post has been liked by user
            const alreadLiked = yield Like.findOne({ where: { user: { id: user.id }, post: { id: postId } } });
            // if already liked, unlike post
            if (alreadLiked) {
                yield alreadLiked.remove();
                return res.json({ success: true, messsage: 'successfully unliked post' });
            }
            // like post
            yield Like.create({
                post,
                user,
            }).save();
        });
    }
}
exports.twitService = new TwitService();
