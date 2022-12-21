<script lang="ts" setup>
import PoolSidebar from "~/components/character/PoolSidebar.vue";
import TrainingScreen from "~/components/training/TrainingScreen.vue";</script>
<template>
  <div class="flex gap-4">
    <div class="w-2/3">
      <TrainingScreen />
    </div>
    <div class="w-1/3">
      <PoolSidebar />
    </div>
  </div>
</template>
