<template>
  <n-card class="my-4">
  <pre>
    {{ JSON.stringify(props.value, null, 2) }}
  </pre>
  </n-card>
</template>
<script lang="ts" setup>
const props = defineProps<{
  value: any
}>();

</script>