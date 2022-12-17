<script setup lang="ts">
import isAdmin from "~/middleware/isAdmin";
import { definePageMeta } from "#imports";

definePageMeta({
  middleware: [isAdmin],
});
</script>
<template>
  <div>Admin Page</div>
</template>
