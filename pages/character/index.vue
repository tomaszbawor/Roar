<script lang="ts" setup>
import { definePageMeta, useCharacter } from "#imports";
import auth from "~/middleware/auth";

definePageMeta({
  middleware: [auth],
});

const character = await useCharacter();
</script>
<template>
  <h1>Character sheets</h1>
  <div v-if="character">
    <h1>You have A character</h1>

    <pre>
      {{ character }}
    </pre>
  </div>
  <div v-else>You do not have a character</div>
</template>
