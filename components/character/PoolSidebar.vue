<script lang="ts" setup>
import { useCharacter } from "~/composables/useCharacter";
import { useRouter } from "#app";
import ICharacterPool from "~/types/ICharacterPool";
import PoolProgressBar from "~/components/character/PoolProgressBar.vue";
import RegenerationTimer from "~/components/character/RegenerationTimer.vue";

const character = await useCharacter();

if (!character) {
  useRouter().push("/character/creation");
}

const characterPool = ref(await getCharPool());

const refreshData = async () => {
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
</template>