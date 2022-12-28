<script lang="ts" setup>

import {
  GeneralStats,
  PoolExtendTraining,
  TrainingCost,
  trainingCostPerUnit,
  TrainingSkillOptions,
  TrainingType
} from "~/engine/training/trainingTypes";
import { computed } from "@vue/reactivity";
import { useTraining } from "#imports";
import ICharacterPool from "~/types/ICharacterPool";
import { TrainCommand } from "~/types/form/TrainCommand";

const props = defineProps<{
  pool: ICharacterPool
}>();

const emit = defineEmits(["refresh"]);

const isPending = ref<boolean>(false);

const labels: Record<TrainingType, string> = {
  STRENGTH: "Strength",
  SPEED: "Speed",
  ENDURANCE: "Endurance",
  INTELLIGENCE: "Intelligence",
  CHAKRA_EXTEND: "Increase Chakra",
  STAMINA_EXTEND: "Increase Stamina",
  OFFENSIVE_GENJUTSU: "Offensive Genjutsu",
  OFFENSIVE_NINJUTSU: "Offensive Ninjutsu",
  OFFENSIVE_TAIJUTSU: "Offensive Taijutsu",
  OFFENSIVE_BUKIJUTSU: "Offensive Bukijutsu",
  DEFENSIVE_GENJUTSU: "Defensive Genjutsu",
  DEFENSIVE_NINJUTSU: "Defensive Ninjutsu",
  DEFENSIVE_TAIJUTSU: "Defansive Taijutsu",
  DEFENSIVE_BUKIJUTSU: "Defensive Bukijutsu"
};

const trainingForm = reactive<TrainCommand>({
  trainType: TrainingSkillOptions.OFFENSIVE_BUKIJUTSU,
  value: 0
});

const trainingOptions: Array<{ label: string, value: TrainingType }> = [...Object.values(TrainingSkillOptions), ...Object.values(GeneralStats), ...Object.values(PoolExtendTraining)].map((trainingType) => {
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
    Math.floor(props.pool.chakra / trainingCost.value.chakra),
    Math.floor(props.pool.stamina / trainingCost.value.stamina)
  );
});

const resetButtons = () => {
  trainingForm.value = 0;
};

const totalTrainingCost = computed<TrainingCost>(() => {
  return {
    chakra: trainingCost.value.chakra * trainingForm.value,
    stamina: trainingCost.value.stamina * trainingForm.value
  };
});

const canTrainAtLeastOnce = computed<boolean>(() => {
  return props.pool.chakra >= trainingCost.value.chakra && props.pool.stamina >= trainingCost.value.stamina;
});

const submitTraining = async () => {
  isPending.value = true;
  try {
    if (trainingForm.value > 0) {
      const character = await useTraining(trainingForm);
      // TODO: Add some kind of toast about successful training
    } else {
    }


  } catch (e) {
    console.log(e);
  } finally {
    isPending.value = false;
    emit("refresh");
    resetButtons();
  }
};

</script>
<template>
  <n-card title="Training">

    <n-select v-model:value="trainingForm.trainType" :options="trainingOptions" @update-value="resetButtons" />

    <div class="mt-4 ml-1">
      Cost of one training is : {{ trainingCost.stamina }} stamina and {{ trainingCost.chakra }} chakra
    </div>

    <div v-if="canTrainAtLeastOnce">
      <n-slider v-model:value="trainingForm.value" :max="maxTrainingValue" />
      <div>
        Training {{ trainingForm.value }} times. Spend {{ totalTrainingCost.stamina }} stamina, and
        {{ totalTrainingCost.chakra }} chakra.
      </div>
    </div>
    <div v-else class="mt-2 ml-1">You do not have resources to train {{ labels[trainingForm.trainType] }}</div>

    <div class="mt-4 flex">
      <n-button :disabled="isPending || !canTrainAtLeastOnce" class="mx-auto" @click="submitTraining">
        Train
      </n-button>
    </div>


  </n-card>
</template>