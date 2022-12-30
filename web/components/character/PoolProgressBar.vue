<template>
  <div class="mb-2">
    <b>
      {{ props.label }}:
    </b>
    <span>{{ props.currentVal }} / {{ props.maxVal }}</span>
    <n-progress :height="16"
                :percentage="percentage"
                :show-indicator="false"
                :status="color"
                border-radius="12px 0 12px 0"
                fill-border-radius="12px 0 12px 0"
                type="line" />
  </div>
</template>
<script lang="ts" setup>

import { computed } from "@vue/reactivity";

const props = defineProps<{
  label: string,
  color: "default" | "success" | "error" | "warning" | "info",
  currentVal: number,
  maxVal: number
}>();


const percentage = computed(() => (100 * props.currentVal) / props.maxVal);

</script>
