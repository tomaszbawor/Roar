<script lang="ts" setup>

import { definePageMeta, useCharacter } from "#imports";
import auth from "~/middleware/auth";
import hasCharacter from "~/middleware/hasCharacter";
import ICharacterPool from "~/types/ICharacterPool";
import PoolSidebar from "~/components/character/PoolSidebar.vue";
import { useFetch } from "#app";
import { AICharacter } from "~/types/battle/AiCharacter";

definePageMeta({
  middleware: [auth, hasCharacter]
});

const characterPool = ref<ICharacterPool>(await getCharPool());

const refresh = async () => {
  characterPool.value = await getCharPool();
};

async function getCharPool(): Promise<ICharacterPool> {
  const char = await useCharacter();
  if (!char || !char.characterPool) {
    throw new Error("User should have character on that page");
  }
  return char!.characterPool!;
}

const arenaCharacters = await useFetch<Array<AICharacter>>("/api/arena", {
  method: "GET"
});

arenaCharacters.data.value

</script>
<template>
  <div class="flex gap-4">
    <div class="w-2/3">
      <n-card>
        <n-page-header>Arena Page</n-page-header>

        <div v-for="oponent in arenaCharacters.data.value">
          <div>{{ oponent }}</div>
        </div>


      </n-card>
    </div>
    <div class="w-1/3">
      <PoolSidebar :pool="characterPool" @refresh="refresh" />
    </div>
  </div>
</template>