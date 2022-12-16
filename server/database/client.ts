import pgk from "@prisma/client";

const { PrismaClient } = pgk;
const prisma = new PrismaClient();
export default prisma;
