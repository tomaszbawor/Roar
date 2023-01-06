<script lang='ts' setup>
const props = defineProps<{ skill: any }>();

</script>
<template>
  <n-button>
    {{ props.skill.skillSkeleton.name }}
  </n-button>
</template>
