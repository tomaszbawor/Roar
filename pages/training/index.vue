<script lang="ts" setup>
import TrainingScreen from "~/components/training/TrainingScreen.vue";
import { definePageMeta, useCharacter } from "#imports";
import auth from "~/middleware/auth";
import ICharacterPool from "~/types/ICharacterPool";
import hasCharacter from "~/middleware/hasCharacter";
import PoolSidebar from "~/components/character/PoolSidebar.vue";

definePageMeta({
  middleware: [auth, hasCharacter]
});

const characterPool = ref<ICharacterPool>(await getCharPool());

const refresh = async () => {
  console.log("Refreshing Data");
  characterPool.value = await getCharPool();
};


async function getCharPool(): Promise<ICharacterPool> {
  const char = await useCharacter();
  if (!char || !char.characterPool) {
    throw new Error("User should have character on that page");
  }
  return char!.characterPool!;
}


</script>

<template>
  <div v-if="characterPool" class="flex gap-4">
    <div class="w-2/3">
      <TrainingScreen @refresh="refresh" />
    </div>
    <div class="w-1/3">
      <PoolSidebar :pool="characterPool" @refresh="refresh" />
    </div>
  </div>
</template>
