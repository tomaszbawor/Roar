<script lang="ts" setup>
import isAdmin from "~/middleware/isAdmin";
import { definePageMeta } from "#imports";
import { useToast } from "vue-toastification";

const onClick = () => {
  useToast().warning("This is a warning toast");
  useToast().success("This is a success toast");
  useToast().error("This is an error toast");
  useToast().info("This is an info toast");
};

definePageMeta({
  middleware: [isAdmin]
});
</script>
<template>
  <div>Admin Page</div>
  <n-button @click="onClick">TOAST</n-button>
</template>
