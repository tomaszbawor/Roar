<script lang="ts" setup>
import { definePageMeta, useCharacter } from "#imports";
import auth from "~/middleware/auth";
import { useRouter } from "#app";
import CharacterStatsSheet from "~/components/character/CharacterStatsSheet.vue";
import { ICharacter } from "~/types/ICharacter";
import ICharacterPool from "~/types/ICharacterPool";
import { maxExpForLevel } from "~/engine/maxExpForLevel";

definePageMeta({
  middleware: [auth]
});

const getPercent = (val: number, max: number): number => {
  return (100 * val) / max;
};


const character = (await useCharacter()) as ICharacter;
const characterPool = character.characterPool as ICharacterPool;
const maxExp = maxExpForLevel(characterPool.level);

const healthPercent = getPercent(characterPool.health, characterPool.maxHealth);
const expPercent = getPercent(characterPool.experience, maxExp);
const chakraPercent = getPercent(characterPool.chakra, characterPool.maxChakra);
const staminaPercent = getPercent(characterPool.stamina, characterPool.maxStamina);


if (!character) {
  useRouter().push("/character/creation");
}
</script>
<template>
  <div class="flex gap-4">
    <div class="w-2/3">
      <CharacterStatsSheet :character="character" />
    </div>
    <div class="w-1/3">
      <n-card>
        <slot name="header">
          <div class="flex justify-center mb-4">
            <TypographyHeader class="">Info</TypographyHeader>
          </div>

          <n-card title="Pools">
            <div class="mb-2">
              <b>
                Exp:
              </b>
              <span>{{ characterPool.experience }} / {{ maxExp }}</span>
              <n-progress :height="16"
                          :percentage="expPercent"
                          :show-indicator="false"
                          border-radius="12px 0 12px 0"
                          fill-border-radius="12px 0 12px 0"
                          status="warning"
                          type="line" />
            </div>

            <div class="mb-2">
              <b>
                Health:
              </b>
              <span>{{ characterPool.health }} / {{ characterPool.maxHealth }}</span>
              <n-progress :height="16"
                          :percentage="healthPercent"
                          :show-indicator="false" border-radius="12px 0 12px 0" fill-border-radius="12px 0 12px 0"
                          status="error"
                          type="line" />
            </div>

            <div class="mb-2">
              <b>
                Chakra:
              </b>
              <span>{{ characterPool.chakra }} / {{ characterPool.maxChakra }}</span>
              <n-progress :height="16"
                          :percentage="chakraPercent"
                          :show-indicator="false" border-radius="12px 0 12px 0" fill-border-radius="12px 0 12px 0"
                          status="info"
                          type="line" />
            </div>

            <div class="mb-2">
              <b>
                Stamina:
              </b>
              <span>{{ characterPool.stamina }} / {{ characterPool.maxStamina }}</span>
              <n-progress :height="16"
                          :percentage="staminaPercent"
                          :show-indicator="false" border-radius="12px 0 12px 0" fill-border-radius="12px 0 12px 0"
                          status="success"
                          type="line" />
            </div>
          </n-card>
        </slot>


      </n-card>
    </div>

  </div>
</template>
