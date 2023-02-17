"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateComment = exports.validateTWit = void 0;
const joi_1 = __importDefault(require("joi"));
const validateTWit = (twit) => {
    return joi_1.default.object({
        twit: joi_1.default.string().min(1).trim().required(),
    }).validate(twit);
};
exports.validateTWit = validateTWit;
const validateComment = (twit) => {
    return joi_1.default.object({
        twit: joi_1.default.string().min(3).trim().required(),
        twitId: joi_1.default.number().required(),
    }).validate(twit);
};
exports.validateComment = validateComment;
