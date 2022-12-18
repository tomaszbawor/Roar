<script lang="ts" setup>
import { useNuxtApp } from "#app";
import { useUser } from "~/composables/useAuth";
import { IUser } from "~/types/IUser";
import { darkTheme } from "naive-ui";

const nuxtApp = useNuxtApp();

// scroll to top on pages change
nuxtApp.hook("page:finish", () => {
  window.scrollTo(0, 0);
});

const dark = darkTheme;
const user: IUser = await useUser();
</script>
<template>
  <div>
    <NuxtLayout>
      <n-config-provider :theme="$colorMode.preference === 'dark' ?  darkTheme : undefined">
        <NuxtPage />
      </n-config-provider>
    </NuxtLayout>
  </div>
</template>
