<script lang="ts" setup>
const props = defineProps<{skill: any}>()

const skillClicked = () => {
  console.log("button clicked")
}
</script>
<template>
  <n-button @click="skillClicked">
      {{props.skill.skillSkeleton.name}}
  </n-button>
</template>
