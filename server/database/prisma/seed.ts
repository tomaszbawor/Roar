import { PrismaClient } from "@prisma/client";

(async () => {

  const prisma = new PrismaClient();

  async function seed() {
    console.log("TODO: Create database seed");
  }

  try {
    await seed();
    await prisma.$disconnect();
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  }
})();
