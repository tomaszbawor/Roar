<script lang="ts" setup>
import { CharacterId } from "~/types/ICharacter";
import DebugInfo from "~/components/util/DebugInfo.vue";
import BattleSkillButton from "~/components/battle /BattleSkillButton.vue";

const props = defineProps<{
  characterId: CharacterId
}>();

const { pending, data: skills } = useFetch(`/api/character/${props.characterId}/skills`, {
  method: "GET"
});

</script>

<template>
  <client-only>
    <n-spin :show="pending">
      <n-card>
        <div v-for="skill in skills">
          <BattleSkillButton :skill="skill" />
        </div>
      </n-card>
    </n-spin>
  </client-only>
</template>
