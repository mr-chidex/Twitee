import { PrismaClient } from '@prisma/client';

import config from '../config';

const globalWithPrisma = global as typeof globalThis & {
  prisma: PrismaClient;
};

const prisma: PrismaClient = globalWithPrisma.prisma || new PrismaClient({ log: ['query'] });

if (config.NODE_ENV === 'production') {
  prisma.$connect().then(() => {
    console.log('Database connected successfully');
  });
} else if (config.NODE_ENV === 'test') {
  if (!globalWithPrisma.prisma) {
    globalWithPrisma.prisma = prisma;
    globalWithPrisma.prisma.$connect();
  }
} else {
  if (!globalWithPrisma.prisma) {
    globalWithPrisma.prisma = prisma;
    globalWithPrisma.prisma.$connect().then(() => {
      console.log('Databases connected successfully');
    });
  }
}

export const Prisma = prisma;
