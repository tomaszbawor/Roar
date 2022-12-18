<script lang="ts" setup>
import { definePageMeta, useCharacter } from "#imports";
import auth from "~/middleware/auth";
import { useRouter } from "#app";

definePageMeta({
  middleware: [auth]
});

const character = await useCharacter();

if (!character) {
  useRouter().push("/character/creation");
}
</script>
<template>
  <n-card>
    
    <slot name="header">
      <div class="flex justify-center mb-4">
        <TypographyHeader class="">Character Sheet</TypographyHeader>
      </div>
    </slot>

    <n-card class="mb-2" title="">
      <div>Name: {{ character.name }}</div>
      <div>Rank: {{ character.rank }}</div>
      <div>Village: {{ character.village }}</div>
    </n-card>

    <n-card class="mb-2" title="Stats">
      <div>Strength: {{ character.strength }}</div>
      <div>Speed: {{ character.speed }}</div>
      <div>Endurance: {{ character.endurance }}</div>
      <div>Intelligence: {{ character.intelligence }}</div>
    </n-card>

    <n-card title="Skills">
      <div>Ninjutsu: {{ character.ninjutsu }}</div>
      <div>Genjutsu: {{ character.genjutsu }}</div>
      <div>Taijutsu: {{ character.taijutsu }}</div>
    </n-card>
  </n-card>
</template>
