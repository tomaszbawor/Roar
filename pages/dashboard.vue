<script setup lang="ts">
import { useState } from "#app";

const data = useState("user").value;
</script>
<template>
  <h1>User Dashboard</h1>
  <pre>
    {{ JSON.stringify(data, null, 2) }}
  </pre>
</template>
