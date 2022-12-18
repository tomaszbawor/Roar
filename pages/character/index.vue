<script lang="ts" setup>
import { definePageMeta, useCharacter } from "#imports";
import auth from "~/middleware/auth";
import { useRouter } from "#app";
import CharacterStatsSheet from "~/components/character/CharacterStatsSheet.vue";

definePageMeta({
  middleware: [auth]
});

const character = await useCharacter();

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
              <span>0 / 1000</span>
              <n-progress :height="16"
                          :percentage="10"
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
              <span>0 / 1000</span>
              <n-progress :height="16"
                          :percentage="10"
                          :show-indicator="false" border-radius="12px 0 12px 0" fill-border-radius="12px 0 12px 0"
                          status="error"
                          type="line" />
            </div>

            <div class="mb-2">
              <b>
                Chakra:
              </b>
              <span>0 / 1000</span>
              <n-progress :height="16"
                          :percentage="10"
                          :show-indicator="false" border-radius="12px 0 12px 0" fill-border-radius="12px 0 12px 0"
                          status="info"
                          type="line" />
            </div>

            <div class="mb-2">
              <b>
                Stamina:
              </b>
              <span>0 / 1000</span>
              <n-progress :height="16"
                          :percentage="10"
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
