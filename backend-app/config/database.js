const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
    schema: './models/schema.prisma'
});

module.exports = prisma;
