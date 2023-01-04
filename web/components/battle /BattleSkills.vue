<script lang="ts" setup>
import BattleSkillButton from "~/components/battle /BattleSkillButton.vue";
import { CharacterId } from "../../../common/Character";

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
