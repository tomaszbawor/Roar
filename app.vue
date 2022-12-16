<script setup lang="ts">
import { useNuxtApp } from "#app";
import { useUser } from "~/composables/useAuth";
import { IUser } from "~/types/IUser";

const nuxtApp = useNuxtApp();

// scroll to top on pages change
nuxtApp.hook("page:finish", () => {
  window.scrollTo(0, 0);
});

const user: IUser = await useUser();
</script>
<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
