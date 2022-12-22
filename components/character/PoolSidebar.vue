<script lang="ts" setup>
import ICharacterPool from "~/types/ICharacterPool";
import PoolProgressBar from "~/components/character/PoolProgressBar.vue";
import RegenerationTimer from "~/components/character/RegenerationTimer.vue";
import { maxExpForLevel } from "~/engine/maxExpForLevel";

const properties = defineProps<{
  pool: ICharacterPool
}>();

const characterPool = properties.pool;

const emit = defineEmits(["refresh"]);

const refreshData = async () => {
  emit("refresh");
};

const maxExp = maxExpForLevel(characterPool.level);
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