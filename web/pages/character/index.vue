<script lang="ts" setup>
import { definePageMeta, useCharacter } from "#imports";
import auth from "~/middleware/auth";
import { useRouter } from "#app";
import CharacterStatsSheet from "~/components/character/CharacterStatsSheet.vue";
import PoolSidebar from "~/components/character/PoolSidebar.vue";
import CharacterPool from "../../../common/CharacterPool";

definePageMeta({
  middleware: [auth]
});

const character = await useCharacter();

if (!character) {
  useRouter().push("/character/creation");
}

const characterPool = ref<CharacterPool>(await getCharPool());

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
  <div class="flex gap-4">
    <div class="w-2/3">
      <CharacterStatsSheet v-if="character" :character="character" />
    </div>
    <div class="w-1/3">
      <PoolSidebar :pool="characterPool" @refresh="refresh" />
    </div>
  </div>
</template>
