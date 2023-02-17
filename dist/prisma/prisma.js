"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Prisma = void 0;
const client_1 = require("@prisma/client");
const config_1 = __importDefault(require("../config"));
const globalWithPrisma = global;
const prisma = globalWithPrisma.prisma || new client_1.PrismaClient({ log: ['query'] });
if (config_1.default.NODE_ENV === 'development') {
    if (!globalWithPrisma.prisma) {
        globalWithPrisma.prisma = prisma;
        globalWithPrisma.prisma.$connect().then(() => {
            console.log('Database connected successfully');
        });
    }
}
else {
    prisma.$connect().then(() => {
        console.log('Database connected successfully');
    });
}
exports.Prisma = prisma;
