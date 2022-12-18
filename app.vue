<script lang="ts" setup>
import { useNuxtApp } from "#app";
import { useUser } from "~/composables/useAuth";
import { IUser } from "~/types/IUser";
import { darkTheme, GlobalThemeOverrides } from "naive-ui";
import { useColorMode } from "#imports";

const nuxtApp = useNuxtApp();

// scroll to top on pages change
nuxtApp.hook("page:finish", () => {
  window.scrollTo(0, 0);
});

const themeOverrides: GlobalThemeOverrides = {
  common: {
    cardColor: "rgb(31 41 55 / var(--tw-bg-opacity))"
  }
};


const user: IUser = await useUser();
useColorMode().preference = "dark";

</script>
<template>
  <div>
    <NuxtLayout>
      <n-config-provider :theme="darkTheme" :theme-overrides="themeOverrides">
        <NuxtPage />
      </n-config-provider>
    </NuxtLayout>
  </div>
</template>
