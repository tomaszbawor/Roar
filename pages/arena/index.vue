<script lang="ts" setup>

import { definePageMeta, useCharacter } from "#imports";
import auth from "~/middleware/auth";
import hasCharacter from "~/middleware/hasCharacter";
import ICharacterPool from "~/types/ICharacterPool";
import PoolSidebar from "~/components/character/PoolSidebar.vue";
import { useFetch } from "#app";
import { ArenaCharacter } from "~/types/battle/ArenaCharacter";
import { StartArenaBattleCommand } from "~/server/services/battleService";
import { IBattle } from "~/types/battle/IBattle";
import { useToast } from "vue-toastification";

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

const arenaCharacters = await useFetch<Array<ArenaCharacter>>("/api/arena", {
  method: "GET"
});

const battle = ref({});

const attack = async (opponentId: string) => {
  //TODO: Fix this mess
  console.log("Attacking:", opponentId);
  const myChar = await useCharacter();
  if (!myChar) {
    throw new Error("User should have character on that page");
  }
  const command: StartArenaBattleCommand = {
    characterId: myChar.id,
    arenaCharacterId: opponentId
  };

  await $fetch<IBattle>("/api/battle/arenaBattle", {
    method: "POST",
    body: command
  }).then(res => {
    //redirect to battle
    useRouter().push(`/battle/${res.id}`);
  }).catch(err => {
    useToast().error(err.message);
  });
};

</script>
<template>
  <div class="flex gap-4">
    <div class="w-2/3">
      <n-card>
        <n-page-header>Arena Page</n-page-header>

        <div v-for="opponent in arenaCharacters.data.value">
          <div>
            <span class="pr-4">{{ opponent.name }}</span>
            <n-button @click="attack(opponent.id)">Attack</n-button>
          </div>
        </div>
        <div>
          <h1>BATTLE</h1>
          <pre>{{ battle }}</pre>
        </div>
      </n-card>
    </div>
    <div class="w-1/3">
      <PoolSidebar :pool="characterPool" @refresh="refresh" />
    </div>
  </div>
</template>