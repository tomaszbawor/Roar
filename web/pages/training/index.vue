<script lang="ts" setup>
import TrainingScreen from "~/components/training/TrainingScreen.vue";
import { definePageMeta, useCharacter } from "#imports";
import auth from "~/middleware/auth";
import hasCharacter from "~/middleware/hasCharacter";
import PoolSidebar from "~/components/character/PoolSidebar.vue";
import { Ref } from "vue";
import CharacterPool from "../../../common/CharacterPool";

definePageMeta({
  middleware: [auth, hasCharacter]
});

const characterPool: Ref<CharacterPool> = ref<CharacterPool>(await getCharPool());

const refresh = async () => {
  characterPool.value = await getCharPool();
};


async function getCharPool(): Promise<CharacterPool> {
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
      <TrainingScreen :pool="characterPool" @refresh="refresh" />
    </div>
    <div class="w-1/3">
      <PoolSidebar :pool="characterPool" @refresh="refresh" />
    </div>
  </div>
</template>
