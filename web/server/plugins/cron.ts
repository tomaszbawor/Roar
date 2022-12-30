import { schedule } from "node-cron";
import { refreshPools } from "~/server/services/regenerationService";
import prisma from "~/server/database/client";

export default defineNitroPlugin(() => {
  console.log("Registration of Nitro hooks");

  schedule("* * * * *", async () => {
    prisma.$transaction(async () => {
      const now = performance.now();
      await refreshPools();
      const after = performance.now();
      console.log(`Regenerate took ${after - now} ms`);
    });
  });
});
