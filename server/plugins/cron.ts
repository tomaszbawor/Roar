import { NitroApp } from "nitropack";
import { schedule } from "node-cron";
import prisma from "~/server/database/client";
import { ICharacter } from "~/types/ICharacter";

export default defineNitroPlugin((nitroApp: NitroApp) => {
  console.log("Registration of Nitro hooks");

  schedule("* * * * *", async () => {

    console.log("Schduled Task at ", new Date());

    const characters: Array<ICharacter> = await prisma.character.findMany({
      include: {
        characterPool: true
      }
    });

    characters.map(
      async (ch) => {
        await prisma.characterPool.update({
          where: {
            characterId: ch.id
          }, data: {
            maxHealth: ch.characterPool!.maxHealth + 5
          }
        });
      }
    );

    console.log("UPDATED");
  });


});