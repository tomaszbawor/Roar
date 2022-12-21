import { NitroApp } from "nitropack";
import { schedule } from "node-cron";
import { refreshPools } from "~/server/services/regenerationService";
import prisma from "~/server/database/client";

export default defineNitroPlugin((nitroApp: NitroApp) => {
  console.log("Registration of Nitro hooks");

  schedule("* * * * *", async () => {
    prisma.$transaction(async (tx) => {
      const now = performance.now();
      await refreshPools();
      const after = performance.now();
      console.log(`Regenerate took ${after - now} ms`);
    });
  });
});
