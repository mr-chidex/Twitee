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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const prisma_1 = require("../prisma");
const utils_1 = require("../utils");
const validators_1 = require("../validators");
class AuthService {
    register(body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.validateRegisterationParams(body);
            const { name, email, password } = body;
            // check if email is already in use
            yield this.validateRegisterationEmail(email);
            // hash password
            const hashedPassword = yield this.hashPassword(password);
            yield prisma_1.Prisma.user.create({
                data: { name, email, password: hashedPassword },
            });
            return {
                success: true,
                message: 'Account successfully created',
            };
        });
    }
    validateRegisterationParams(body) {
        const { error } = (0, validators_1.validateRegisterParams)(body);
        if (error) {
            (0, utils_1.errorResponse)(error.details[0].message, 400);
        }
    }
    validateRegisterationEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const isEmail = yield prisma_1.Prisma.user.findUnique({ where: { email } });
            if (isEmail) {
                (0, utils_1.errorResponse)('Email already in use', 400);
            }
        });
    }
    findUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.Prisma.user.findFirst({ where: { email } });
        });
    }
    hashPassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            const salt = yield bcrypt_1.default.genSalt(12);
            return yield bcrypt_1.default.hash(password, salt);
        });
    }
    login(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const { error } = (0, validators_1.validateLoginParams)(body);
            if (error) {
                (0, utils_1.errorResponse)(error.details[0].message, 400);
            }
            const { email, password } = body;
            const user = yield this.validateCredentials(email, password);
            const token = this.getToken(user);
            return {
                success: true,
                message: 'Login successful',
                data: token,
            };
        });
    }
    validateCredentials(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            //check if email is correct
            const user = yield prisma_1.Prisma.user.findUnique({ where: { email } });
            if (!user) {
                return (0, utils_1.errorResponse)('Email or Password is incorrect', 400);
            }
            //check if password is correct
            const isPassword = yield bcrypt_1.default.compare(password, user.password);
            if (!isPassword) {
                return (0, utils_1.errorResponse)('Email or Password is incorrect', 400);
            }
            return user;
        });
    }
    getToken(user) {
        return jsonwebtoken_1.default.sign({
            iat: Date.now(),
            iss: 'mainstack',
            userId: user.id,
        }, config_1.default.SECRET_KEY, { expiresIn: '48h' });
    }
}
exports.authService = new AuthService();
