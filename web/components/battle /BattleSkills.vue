<script lang='ts' setup>
import BattleSkillButton from '~/components/battle /BattleSkillButton.vue';
import { CharacterId } from '../../../common/Character';
import { OwnedSkill, SkillSkeletonId } from '../../../common/Skills';
import { useFetch } from '#app';

const props = defineProps<{
  characterId: CharacterId
}>();

const emitter = defineEmits<{
  (event: 'attack', skillId: SkillSkeletonId): void
}>();

const { pending, data: skills } = useFetch<Array<OwnedSkill>>(`/api/characters/me/skills`, {
  method: 'GET',
});


const performBattleAction = (skillId: SkillSkeletonId) => {
  emitter('attack', skillId);
};

</script>

<template>
  <client-only>
    <n-spin :show='pending'>

      <n-card>
        <div v-for='skill in skills'>
          <BattleSkillButton :skill='skill' @click='performBattleAction(skill.skillSkeletonId)' />
        </div>
      </n-card>
    </n-spin>
  </client-only>
</template>
