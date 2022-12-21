import { NitroApp } from "nitropack";
import { schedule } from "node-cron";
import { refreshPools } from "~/server/services/regenerationService";
import prisma from "~/server/database/client";

export default defineNitroPlugin((nitroApp: NitroApp) => {
  console.log("Registration of Nitro hooks");

  schedule("* * * * *", async () => {
    console.log("Running regeneration task ", new Date());

    prisma.$transaction(async (tx) => {
      await refreshPools();
    });
  });
});
