import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

(async () => {
  const prisma = new PrismaClient();

  async function seed() {
    // Create Admin User
    await prisma.user.create({
      data: {
        email: "admin@admin.com",
        password: await hashPassword("admin"),
        role: "ADMIN",
        name: "RoarAdmin",
      },
    });
  }

  const hashPassword = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, 10);
  };

  try {
    await seed();
    await prisma.$disconnect();
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  }
})();
