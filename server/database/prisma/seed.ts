import { PrismaClient } from "@prisma/client";

// Imports of the services needs to be relative because of the ts-node configuration
import { hashPassword } from "../../services/passwordHasher";

(async () => {
  const prisma = new PrismaClient();

  async function seed() {
    // Create Test users
    await createAdmin();
    await createMod();
    await createUser();
    await createAi();
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
  const createMod = async () => {
    const moderator = await prisma.user.create({
      data: {
        email: "mod@mod.com",
        password: await hashPassword("mod"),
        role: "MOD",
        name: "RoarModerator",
      },
    });

    const char = await prisma.character.create({
      data: {
        name: "Moderator",
        userId: moderator.id,
        village: "MIST",
      },
    });

    await prisma.characterPool.create({
      data: {
        characterId: char.id,
      },
    });
  };
  const createUser = async () => {
    const user = await prisma.user.create({
      data: {
        email: "user@user.com",
        password: await hashPassword("user"),
        role: "MOD",
        name: "RoarUser",
      },
    });

    const char = await prisma.character.create({
      data: {
        name: "User",
        userId: user.id,
        village: "MIST",
      },
    });

    await prisma.characterPool.create({
      data: {
        characterId: char.id,
      },
    });
  };

  const createAi = async () => {
    await prisma.aICharacter.create({
      data: {
        name: "Training Dummy",
      },
    });

    await prisma.aICharacter.create({
      data: {
        name: "Strong character",
        health: 100000,
        strength: 100,
        endurance: 100,
        intelligence: 100,
        speed: 100,
        offensiveNinjutsu: 10000,
        defensiveNinjutsu: 10000,
        offensiveTaijutsu: 10000,
        defensiveTaijutsu: 10000,
        offensiveGenjutsu: 10000,
        defensiveGenjutsu: 10000,
        offensiveBukijutsu: 10000,
        defensiveBukijutsu: 10000,
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
