<script lang="ts" setup>
import { ICharacter } from "~/types/ICharacter";

const props = defineProps<{ character: ICharacter }>();
const character = props.character;


</script>

<template>
  <n-card>

    <slot name="header">
      <div class="flex justify-center mb-4">
        <TypographyHeader class="">Character Sheet</TypographyHeader>
      </div>
    </slot>

    <n-card class="mb-2" title="">
      <div><b>Name:</b> {{ character.name }}</div>
      <div><b>Rank:</b> {{ character.rank }}</div>
      <div><b>Village:</b> {{ character.village }}</div>
    </n-card>

    <n-card class="mb-2" title="Stats">
      <div><b>Strength:</b> {{ character.strength }}</div>
      <div><b>Speed:</b> {{ character.speed }}</div>
      <div><b>Endurance:</b> {{ character.endurance }}</div>
      <div><b>Intelligence:</b> {{ character.intelligence }}</div>
    </n-card>

    <n-card title="Skills">
      <div>Ninjutsu: {{ character.ninjutsu }}</div>
      <div>Genjutsu: {{ character.genjutsu }}</div>
      <div>Taijutsu: {{ character.taijutsu }}</div>
    </n-card>
  </n-card>
</template>