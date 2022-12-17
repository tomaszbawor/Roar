<script setup lang="ts">
import { definePageMeta } from "#imports";
import isAdmin from "~/middleware/isAdmin";

definePageMeta({
  middleware: [isAdmin],
});
</script>
<template>
  <div>Admin Page</div>
</template>
