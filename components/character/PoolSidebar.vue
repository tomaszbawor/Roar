<script lang="ts" setup>
import ICharacterPool from "~/types/ICharacterPool";
import PoolProgressBar from "~/components/character/PoolProgressBar.vue";
import RegenerationTimer from "~/components/character/RegenerationTimer.vue";
import { maxExpForLevel } from "~/engine/maxExpForLevel";
import { useCharacter } from "~/composables/useCharacter";
import { getRegenerationRateForCharacter } from "~/engine/character/characterRegen";

const properties = defineProps<{
  pool: ICharacterPool
}>();

const emit = defineEmits(["refresh"]);

const refreshData = async () => {
  emit("refresh");
};

const character = await useCharacter();

const regenRate = getRegenerationRateForCharacter(character!);

const maxExp = computed<number>(() => {
  return maxExpForLevel(properties.pool.level);
});
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
        <b>Level: </b> {{ properties.pool.level }}
      </div>
    </n-card>

    <n-card title="Pools">
      <PoolProgressBar :current-val="properties.pool.experience" :max-val="maxExp" color="warning" label="Exp" />
      <PoolProgressBar :current-val="properties.pool.health" :max-val="properties.pool.maxHealth" color="error"
                       label="Health" />
      <PoolProgressBar :current-val="properties.pool.chakra" :max-val="properties.pool.maxChakra" color="info"
                       label="Chakra" />
      <PoolProgressBar :current-val="properties.pool.stamina" :max-val="properties.pool.maxStamina" color="success"
                       label="Stamina" />

      <div>
        Regeneration Rate: <b>{{ regenRate }}</b>
      </div>

      <RegenerationTimer class="mt-6" @refresh="refreshData" />
    </n-card>

  </n-card>
</template>