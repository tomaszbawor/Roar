<script lang="ts" setup>
import { definePageMeta, useCharacter } from "#imports";
import auth from "~/middleware/auth";
import { useRouter } from "#app";
import CharacterStatsSheet from "~/components/character/CharacterStatsSheet.vue";
import { ICharacter } from "~/types/ICharacter";
import ICharacterPool from "~/types/ICharacterPool";
import { maxExpForLevel } from "~/engine/maxExpForLevel";
import PoolProgressBar from "~/components/character/PoolProgressBar.vue";

definePageMeta({
  middleware: [auth]
});

const getPercent = (val: number, max: number): number => {
  return (100 * val) / max;
};


const character = (await useCharacter()) as ICharacter;
const characterPool = character.characterPool as ICharacterPool;
const maxExp = maxExpForLevel(characterPool.level);

if (!character) {
  useRouter().push("/character/creation");
}
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

        <n-card title="Pools">
          <PoolProgressBar :current-val="characterPool.experience" :max-val="maxExp" color="warning" label="Exp" />
          <PoolProgressBar :current-val="characterPool.health" :max-val="characterPool.maxHealth" color="error"
                           label="Health" />
          <PoolProgressBar :current-val="characterPool.chakra" :max-val="characterPool.maxChakra" color="info"
                           label="Chakra" />
          <PoolProgressBar :current-val="characterPool.stamina" :max-val="characterPool.maxStamina" color="success"
                           label="Stamina" />
        </n-card>

      </n-card>
    </div>
  </div>
</template>
