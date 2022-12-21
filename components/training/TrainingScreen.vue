<script lang="ts" setup>

import {
  PoolExtendTraining,
  SkillType,
  StatType,
  trainingCostPerUnit,
  TrainingType
} from "~/engine/training/trainingTypes";
import { computed } from "@vue/reactivity";


const labels: Record<TrainingType, string> = {
  GENJUTSU: "Genjutsu",
  NINJUTSU: "Ninjutsu",
  TAIJUTSU: "Taijutsu",
  STRENGTH: "Strength",
  SPEED: "Speed",
  ENDURANCE: "Endurance",
  INTELLIGENCE: "Intelligence",
  CHAKRA_EXTEND: "Increase Chakra",
  STAMINA_EXTEND: "Increase Stamina"
};

const trainingForm = reactive<{ trainType: TrainingType, value: number }>({
  trainType: SkillType.GENJUTSU,
  value: 0
});

const trainingOptions: Array<{ label: string, value: TrainingType }> = [...Object.values(SkillType), ...Object.values(StatType), ...Object.values(PoolExtendTraining)].map((trainingType) => {
  return {
    label: labels[trainingType],
    value: trainingType
  };
});

const trainingCost = computed(() => {
  return trainingCostPerUnit[trainingForm.trainType];
});

const maxTrainingValue = computed(() => {
  // TODO: Calculate how many times I can train
});

const totalTrainingCost = computed(() => {
  //TODO:  Calculate total training cost
});

const submitTraining = () => {
  console.log("Submit training ");
};

</script>
<template>
  <pre>{{ trainingForm }}</pre>
  <n-card title="Training">

    <n-select v-model:value="trainingForm.trainType" :options="trainingOptions" />

    <div class="mt-4 ml-1">
      Cost of one training is : {{ trainingCost.stamina }} stamina and {{ trainingCost.chakra }} chakra
    </div>

    <n-slider v-model:value="trainingForm.value" />

    <div class="mt-4 flex">
      <n-button class="mx-auto" @click="submitTraining">
        Train
      </n-button>
    </div>


  </n-card>
</template>