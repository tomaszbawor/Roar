<script setup lang="ts">
import { definePageMeta } from "#imports";

definePageMeta({
  middleware: [auth], // prevent from getting to dashboard unlogged users
});
import { useState } from "#app";
import auth from "~/middleware/auth";

const data = useState("user").value;
</script>
<template>
  <h1>User Dashboard</h1>
  <pre>
    {{ JSON.stringify(data, null, 2) }}
  </pre>
</template>
