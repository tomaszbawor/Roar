import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { createCharacter } from "~/server/repositories/characterRepository";

(async () => {
  const prisma = new PrismaClient();

  async function seed() {
    // Create Admin User
    const admin = await prisma.user.create({
      data: {
        email: "admin@admin.com",
        password: await hashPassword("admin"),
        role: "ADMIN",
        name: "RoarAdmin",
      },
    });

    await createCharacter({
      name: "Kami",
      userId: admin.id,
      village: "MIST",
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
