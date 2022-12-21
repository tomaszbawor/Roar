<script lang="ts" setup>
import { useIntervalFn } from "@vueuse/core";

const emit = defineEmits(["refresh"]);
const remaining = ref(secondsUntilReset());
const wasRefreshedThisMinute = ref(false);

function secondsUntilReset(): number {
  return 60 - (new Date).getSeconds();
}

//TODO: Fix this shit you idiot!
useIntervalFn(() => {
  remaining.value = secondsUntilReset();
  if (secondsUntilReset() === 58) { // Give two seconds for database update to be done
    if (wasRefreshedThisMinute.value === false) {
      emit("refresh");
      wasRefreshedThisMinute.value = true;
    }
  }
  if (secondsUntilReset() === 57) {
    wasRefreshedThisMinute.value = false;
  }
}, 200);
</script>

<template>
  <n-card>
    <div class="flex">
      <div class="mx-auto">Regeneration in: {{ remaining }} s</div>
    </div>
  </n-card>
</template>