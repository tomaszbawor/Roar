<script lang="ts" setup>
import { definePageMeta, useCharacter } from "#imports";
import auth from "~/middleware/auth";
import { useRouter } from "#app";
import CharacterStatsSheet from "~/components/character/CharacterStatsSheet.vue";
import ICharacterPool from "~/types/ICharacterPool";
import { maxExpForLevel } from "~/engine/maxExpForLevel";
import PoolProgressBar from "~/components/character/PoolProgressBar.vue";
import RegenerationTimer from "~/components/character/RegenerationTimer.vue";

definePageMeta({
  middleware: [auth]
});

const character = await useCharacter();

if (!character) {
  useRouter().push("/character/creation");
}

const characterPool = ref(await getCharPool());
const maxExp = maxExpForLevel(characterPool.value.level);

async function getCharPool(): Promise<ICharacterPool> {
  const char = await useCharacter();
  if (!char || !char.characterPool) {
    throw new Error("User should have character on that page");
  }
  return char!.characterPool!;
}

const refreshData = async () => {
  console.log("Refreshing Data");
  characterPool.value = await getCharPool();
};


</script>
<template>
  <div class="flex gap-4">
    <div class="w-2/3">
      <CharacterStatsSheet :character="character" />
    </div>
    <div class="w-1/3">
      <n-card>
        <slot name="header">
          <div class="flex justify-center mb-4">
            <TypographyHeader class="">Info</TypographyHeader>
          </div>
        </slot>

        <n-card class="mb-4">

          <div>
            <b>Level: </b> {{ characterPool.level }}
          </div>
        </n-card>


        <n-card title="Pools">
          <PoolProgressBar :current-val="characterPool.experience" :max-val="maxExp" color="warning" label="Exp" />
          <PoolProgressBar :current-val="characterPool.health" :max-val="characterPool.maxHealth" color="error"
                           label="Health" />
          <PoolProgressBar :current-val="characterPool.chakra" :max-val="characterPool.maxChakra" color="info"
                           label="Chakra" />
          <PoolProgressBar :current-val="characterPool.stamina" :max-val="characterPool.maxStamina" color="success"
                           label="Stamina" />

          <RegenerationTimer class="mt-6" @refresh="refreshData" />
        </n-card>

      </n-card>
    </div>
  </div>
</template>
