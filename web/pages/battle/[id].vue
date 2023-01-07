<script lang='ts' setup>
import PoolProgressBar from '~/components/character/PoolProgressBar.vue';
import Header from '~/components/typography/Header.vue';
import BattleSkills from '~/components/battle /BattleSkills.vue';
import { Battle } from '../../../common/battle/Battle';
import { Character } from '../../../common/Character';
import CharacterPool from '../../../common/CharacterPool';
import { useFetch, useRoute } from '#app';
import { SkillSkeletonId } from '../../../common/Skills';

const battleId = useRoute().params.id;
const {
  data: battle,
  refresh: battleRefresh,
  pending: battleRefreshPending,
} = await useFetch<Battle>(`/api/battle/${battleId}`, {
  method: 'GET',
});

const {
  data: character,
  refresh: characterRefresh,
} = await useFetch<Character>('/api/characters/me', {
  method: 'GET',
});

const pool = computed<CharacterPool>(() => {
  return character.value?.characterPool as CharacterPool;
});

const isAttacker = computed<boolean>(() => {
  return character.value?.id === battle.value?.attackerId;
});
const isDefender = computed<boolean>(() => {
  return character.value?.id === battle.value?.defenderId;
});

const attackerName = computed<string>(() => {
  return isAttacker ? character.value!.name : 'TODO MONSTER NAME';
});

const defenderName = computed<string>(() => {
  if (isAttacker) {
    if (battle.value!.defenderId) {
      return 'Player Defender';
    } else {
      return battle.value!.aiDefender!.name;
    }
  } else {
    return character.value!.name;
  }
});

const attackPerformed = async (skillId: SkillSkeletonId) => {
  await useFetch('/api/battle/arena/action', {
    method: 'POST',
    body: {
      skillId,
      battleId: battleId,
    },
  });
  await battleRefresh();
  await characterRefresh();
};

const interpolateLogs = (log: string, attackerName: string, defenderName: string) => {
  return log.replace('{ATTACKER}', attackerName).replace('{DEFENDER}', defenderName);
};

</script>
<template>
  <n-spin :show='battleRefreshPending'>
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
              <PoolProgressBar :current-val='pool.health' :max-val='pool.maxHealth' color='error'
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
            <div v-if='battle' class='w-1/2'>
              <Header>{{ defenderName }}</Header>
              <PoolProgressBar :current-val='battle.defenderHealth' :max-val='battle?.defenderMaxHealth' color='error'
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
      <div v-if='battle?.state !== "FINISHED" && character'>
        <BattleSkills :characterId='character.id' @attack='attackPerformed' />
      </div>
      <div v-else>
        <n-card>
          Battle Finished with {{ battle?.battleResult }}
        </n-card>
      </div>

    </div>
    <div class='mt-4'>
      <n-card>
        Battle Logs


        <div v-for='log in battle?.battleLog'>
          <div>Turn: {{ log.turn }}</div>
          <div>{{ interpolateLogs(log.attackerLog, attackerName, defenderName) }} <b>{{ log.attackerDamage
            }}</b> Damage.
          </div>
          <div>{{ interpolateLogs(log.defenderLog, defenderName, attackerName) }} <b>{{ log.defenderDamage
            }}</b> Damage
          </div>
        </div>

      </n-card>
    </div>
  </n-spin>
</template>