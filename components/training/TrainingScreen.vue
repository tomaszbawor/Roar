<script lang="ts" setup>

import {
  PoolExtendTraining,
  SkillType,
  StatType,
  TrainingCost,
  trainingCostPerUnit,
  TrainingType
} from "~/engine/training/trainingTypes";
import { computed } from "@vue/reactivity";
import { definePageMeta } from "#imports";
import hasCharacter from "~/middleware/hasCharacter";
import ICharacterPool from "~/types/ICharacterPool";
import { TrainCommand } from "~/types/form/TrainCommand";

definePageMeta({
  middleware: [hasCharacter]
});

const characterPool: ICharacterPool = ((await useCharacter())?.characterPool) as ICharacterPool;

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

const trainingForm = reactive<TrainCommand>({
  trainType: SkillType.GENJUTSU,
  value: 0
});

const trainingOptions: Array<{ label: string, value: TrainingType }> = [...Object.values(SkillType), ...Object.values(StatType), ...Object.values(PoolExtendTraining)].map((trainingType) => {
  return {
    label: labels[trainingType],
    value: trainingType
  };
});

const trainingCost = computed<TrainingCost>(() => {
  return trainingCostPerUnit[trainingForm.trainType];
});

const maxTrainingValue = computed<number>(() => {
  return Math.min(
    characterPool.chakra / trainingCost.value.chakra,
    characterPool.stamina / trainingCost.value.stamina
  );
});

const onTrainingTypeChange = () => {
  trainingForm.value = 0;
};

const totalTrainingCost = computed<TrainingCost>(() => {
  return {
    chakra: trainingCost.value.chakra * trainingForm.value,
    stamina: trainingCost.value.stamina * trainingForm.value
  };
});

const submitTraining = () => {


};

</script>
<template>
  <n-card title="Training">

    <n-select v-model:value="trainingForm.trainType" :options="trainingOptions" @change="onTrainingTypeChange" />

    <div class="mt-4 ml-1">
      Cost of one training is : {{ trainingCost.stamina }} stamina and {{ trainingCost.chakra }} chakra
    </div>

    <n-slider v-model:value="trainingForm.value" :max="maxTrainingValue" />

    <div>
      Training {{ trainingForm.value }} times. Spend {{ totalTrainingCost.stamina }} stamina, and
      {{ totalTrainingCost.chakra }} chakra.
    </div>

    <div class="mt-4 flex">
      <n-button class="mx-auto" @click="submitTraining">
        Train
      </n-button>
    </div>


  </n-card>
</template>