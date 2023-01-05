<script lang='ts' setup>
import PoolProgressBar from '~/components/character/PoolProgressBar.vue';
import Header from '~/components/typography/Header.vue';
import DebugInfo from '~/components/util/DebugInfo.vue';
import BattleSkills from '~/components/battle /BattleSkills.vue';
import { IBattle } from '../../../common/battle/IBattle';
import { Character } from '../../../common/Character';
import CharacterPool from '../../../common/CharacterPool';
import { useFetch, useRoute } from '#app';
import { SkillSkeletonId } from '../../../common/Skills';

const battleId = useRoute().params.id;
const battle = await $fetch<IBattle>(`/api/battle/${battleId}`, {
  method: 'GET',
});
const character = await useCharacter() as Character;
const pool = character.characterPool as CharacterPool;

const isAttacker = character.id === battle.attackerId;
const isDefender = character.id === battle.defenderId;

const attackerName = computed<string>(() => {
  return isAttacker ? character.name : 'TODO MONSTER NAME';
});

const defenderName = computed<string>(() => {
  if (isAttacker) {
    if (battle.defenderId) {
      return 'Player Defender';
    } else {
      return battle.aiDefender!.name;
    }
  } else {
    return character.name;
  }
});

const attackPerformed = (skillId: SkillSkeletonId) => {
  useFetch('/api/battle/arena/action', {
    method: 'POST',
    body: {
      skillId,
      battleId: battleId,
    },
  }).then(() => {
      window.location.reload();
    },
  );
};

</script>
<template>
  <div class='flex gap-4'>
    <div class='w-1/2'>
      <n-card>
        <slot name='header'>
          <div class='flex justify-center mb-4'>
            <TypographyHeader class=''>Attacker</TypographyHeader>
          </div>
        </slot>

        <div class='flex gap-4'>
          <div class='w-1/2'>
            <n-image class='flex justify-center' src='https://via.placeholder.com/150' />
          </div>
          <div class='w-1/2'>
            <Header>{{ attackerName }}</Header>
            <PoolProgressBar :current-val='battle.attackerHealth' :max-val='battle.attackerMaxHealth' color='error'
                             label='Health' />
            <div v-if='isAttacker'>
              <PoolProgressBar :current-val='pool.chakra' :max-val='pool.maxChakra' color='info'
                               label='Chakra' />
              <PoolProgressBar :current-val='pool.stamina' :max-val='pool.maxStamina' color='success'
                               label='Stamina' />
            </div>
          </div>
        </div>


      </n-card>
    </div>
    <div class='w-1/2'>
      <n-card class='h-full'>
        <slot name='header'>
          <div class='flex justify-center mb-4'>
            <TypographyHeader>Defender</TypographyHeader>
          </div>
        </slot>

        <div class='flex gap-4'>
          <div class='w-1/2'>
            <n-image class='flex justify-center' src='https://via.placeholder.com/150' />
          </div>
          <div class='w-1/2'>
            <Header>{{ defenderName }}</Header>
            <PoolProgressBar :current-val='battle.defenderHealth' :max-val='battle.defenderMaxHealth' color='error'
                             label='Health' />
            <div v-if='isDefender'>
              <PoolProgressBar :current-val='pool.chakra' :max-val='pool.maxChakra' color='info'
                               label='Chakra' />
              <PoolProgressBar :current-val='pool.stamina' :max-val='pool.maxStamina' color='success'
                               label='Stamina' />
            </div>
          </div>
        </div>
      </n-card>
    </div>
  </div>

  <div class='mt-4'>
    <BattleSkills :characterId='character.id' @attack='attackPerformed' />
  </div>

  <div class='mt-4'>
    <n-card>
      Battle Logs
      <DebugInfo :value='battle.battleLog' />
    </n-card>
  </div>


</template>