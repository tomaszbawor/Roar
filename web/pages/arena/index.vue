<script lang='ts' setup>

import { definePageMeta, useCharacter } from '#imports';
import auth from '~/middleware/auth';
import hasCharacter from '~/middleware/hasCharacter';

import PoolSidebar from '~/components/character/PoolSidebar.vue';


import { useToast } from 'vue-toastification';
import CharacterPool from '../../../common/CharacterPool';
import { ArenaCharacter } from '../../../common/battle/ArenaCharacter';
import { IBattle } from '../../../common/battle/IBattle';

definePageMeta({
  middleware: [auth, hasCharacter],
});

const characterPool = ref<CharacterPool>(await getCharPool());

const refresh = async () => {
  characterPool.value = await getCharPool();
};

async function getCharPool(): Promise<CharacterPool> {
  const char = await useCharacter();
  if (!char || !char.characterPool) {
    throw new Error('User should have character on that page');
  }
  return char!.characterPool!;
}

const arenaCharacters = await useFetch<Array<ArenaCharacter>>('/api/battle/arenaChars', {
  method: 'GET',
});

const battle = ref({});

const attack = async (opponentId: string) => {
  const command = {
    arenaCharacterId: opponentId,
  };

  await $fetch<IBattle>('/api/battle/arena', {
    method: 'POST',
    body: command,
  }).then(res => {
    //redirect to battle
    useRouter().push(`/battle/${res.id}`);
  }).catch(err => {
    useToast().error(err.message);
  });
};

</script>
<template>
  <div class='flex gap-4'>
    <div class='w-2/3'>
      <n-card>
        <n-page-header>Arena Page</n-page-header>
        <div>
          <div v-for='opponent in arenaCharacters.data.value'>
            <div>
              <span class='pr-4'>{{ opponent.name }}</span>
              <n-button @click='attack(opponent.id)'>Attack</n-button>
            </div>
          </div>
        </div>
      </n-card>
    </div>
    <div class='w-1/3'>
      <PoolSidebar :pool='characterPool' @refresh='refresh' />
    </div>
  </div>
</template>