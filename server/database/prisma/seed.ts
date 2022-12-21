import { PrismaClient } from "@prisma/client";

// Imports of the services needs to be relative because of the ts-node configuration
import { hashPassword } from "../../services/passwordHasher";

(async () => {
  const prisma = new PrismaClient();

  async function seed() {
    // Create Admin User
    await createAdmin();
  }

  const createAdmin = async () => {
    const admin = await prisma.user.create({
      data: {
        email: "admin@admin.com",
        password: await hashPassword("admin"),
        role: "ADMIN",
        name: "RoarAdmin",
      },
    });

    const char = await prisma.character.create({
      data: {
        name: "Kami",
        userId: admin.id,
        village: "MIST",
      },
    });

    await prisma.characterPool.create({
      data: {
        characterId: char.id,
      },
    });
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
