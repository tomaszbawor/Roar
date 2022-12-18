<script lang="ts" setup>
import auth from "~/middleware/auth";
import { definePageMeta } from "#imports";
import { useState } from "#app";


definePageMeta({
  middleware: [auth] // prevent from getting to dashboard unlogged users
});

const user = useState("user").value;
</script>
<template>
  <div class="page">
    <TypographyHeader>Dashboard Data</TypographyHeader>

    <div class="border-2 w-full flex flex-wrap ">
      <div class="right-column">User Data</div>
      <div class="left-column">Profile Data</div>
    </div>
    <n-space>
      <n-input placeholder="basicInput" round type="text">ELO</n-input>
    </n-space>


  </div>


</template>
<style scoped>
.page {
  @apply flex flex-col items-center
}

.right-column {
  @apply border-2 basis-2/3
}

.left-column {
  @apply border-2 basis-1/3
}
</style>