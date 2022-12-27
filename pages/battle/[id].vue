<script lang="ts" setup>
import { IBattle } from "~/types/battle/IBattle";

const battleId = useRoute().params.id;
const battle = await $fetch<IBattle>(`/api/battle?battleId=${battleId}`, {
  method: "GET"
});
</script>
<template>
  BATTLE with id: {}

  <pre>
    {{ battle }}
  </pre>
</template>