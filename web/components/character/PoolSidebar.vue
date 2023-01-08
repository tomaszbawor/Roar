<script lang='ts' setup>

import PoolProgressBar from '~/components/character/PoolProgressBar.vue';
import RegenerationTimer from '~/components/character/RegenerationTimer.vue';
import { useCharacter } from '~/composables/useCharacter';
import CharacterPool from '../../../common/CharacterPool';
import { Character } from '../../../common/Character';
import { getRegenerationRateForCharacter } from '../../../common/engine/character/characterRegen';
import { maxExpForLevel } from '../../../common/engine/maxExpForLevel';


const properties = defineProps<{
  pool: CharacterPool
}>();

const emit = defineEmits(['refresh']);

const refreshData = async () => {
  emit('refresh');
};

const character = await useCharacter() as Character;

const regenRate = getRegenerationRateForCharacter(character!);

const maxExp = computed<number>(() => {
  return maxExpForLevel(properties.pool.level);
});

const battleLink = computed<string>(() => {
  return `/battle/${character.currentBattleId}`;
});
</script>
<template>
  <n-card>
    <slot name='header'>
      <div class='flex justify-center mb-4'>
        <TypographyHeader class=''>Info</TypographyHeader>
      </div>
    </slot>

    <n-card v-if='character.isInBattle' class='mb-4'>
      <div class=' flex justify-center text-red-400'>
        <nuxt-link :to='battleLink' class='text-red-400 underline'> You are in a battle</nuxt-link>
      </div>
    </n-card>

    <n-card class='mb-4'>
      <div>
        <b>Level: </b> {{ properties.pool.level }}
      </div>
      <div>
        <b>Currency: {{ character.currency }}</b>
      </div>
    </n-card>

    <n-card title='Pools'>
      <PoolProgressBar :current-val='properties.pool.experience' :max-val='maxExp' color='warning' label='Exp' />
      <PoolProgressBar :current-val='properties.pool.health' :max-val='properties.pool.maxHealth' color='error'
                       label='Health' />
      <PoolProgressBar :current-val='properties.pool.chakra' :max-val='properties.pool.maxChakra' color='info'
                       label='Chakra' />
      <PoolProgressBar :current-val='properties.pool.stamina' :max-val='properties.pool.maxStamina' color='success'
                       label='Stamina' />

      <div>
        Regeneration Rate: <b>{{ regenRate }}</b>
      </div>

      <RegenerationTimer class='mt-6' @refresh='refreshData' />
    </n-card>

  </n-card>
</template>