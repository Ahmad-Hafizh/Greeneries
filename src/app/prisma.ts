import { PrismaClient } from '../../node_modules/@prisma/client';

export default new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});
