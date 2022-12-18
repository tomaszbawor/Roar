<script lang="ts" setup>
import { useNuxtApp } from "#app";
import { useUser } from "~/composables/useAuth";
import { IUser } from "~/types/IUser";
import { darkTheme } from "naive-ui";
import { useColorMode } from "#imports";

const nuxtApp = useNuxtApp();

// scroll to top on pages change
nuxtApp.hook("page:finish", () => {
  window.scrollTo(0, 0);
});

const user: IUser = await useUser();
useColorMode().preference = "dark";

// hardcode it
// const mode = computed(() => {
//   return $colorMode.preference === 'dark' ?  darkTheme : undefined
// })

</script>
<template>
  <div>
    <NuxtLayout>
      <n-config-provider :theme="darkTheme">
        <NuxtPage />
      </n-config-provider>
    </NuxtLayout>
  </div>
</template>
