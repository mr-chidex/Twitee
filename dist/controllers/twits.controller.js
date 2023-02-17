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
exports.twitController = void 0;
const services_1 = require("../services");
class TwitController {
    //@POST
    postTwit(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield services_1.twitService.addTwit(req.user, req.body);
            res.status(201).json(Object.assign({}, response));
        });
    }
    //@GET
    getAllTwit(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield services_1.twitService.getTwits();
            res.status(200).json(Object.assign({}, response));
        });
    }
    //@GET
    getTwit(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield services_1.twitService.getTwit((_a = req.params) === null || _a === void 0 ? void 0 : _a.id);
            res.status(200).json(Object.assign({}, response));
        });
    }
    //@GET
    getTwitsOfUser(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield services_1.twitService.getAllTwitOfAUser((_a = req.params) === null || _a === void 0 ? void 0 : _a.userId);
            res.status(200).json(Object.assign({}, response));
        });
    }
    //@DELETE
    deleteTwit(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield services_1.twitService.deleteTwit(req.user, (_a = req.params) === null || _a === void 0 ? void 0 : _a.id);
            res.status(200).json(Object.assign({}, response));
        });
    }
    //@PATCH
    updateTwit(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield services_1.twitService.updateTwit(req.user, (_a = req.params) === null || _a === void 0 ? void 0 : _a.id, req.body);
            res.status(200).json(Object.assign({}, response));
        });
    }
    //@GET
    likeAndUnlikeTwit(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield services_1.twitService.likeOrUnlikeTwit(req.user, (_a = req.params) === null || _a === void 0 ? void 0 : _a.twitId);
            res.status(200).json(Object.assign({}, response));
        });
    }
}
exports.twitController = new TwitController();
