<script lang="ts" setup>
import auth from "~/middleware/auth";
import { definePageMeta } from "#imports";
import { useState } from "#app";


definePageMeta({
  middleware: [auth] // prevent from getting to dashboard not authenticated users
});

const user = useState("user").value;
</script>
<template>
  <div class="page">
    <TypographyHeader>Dashboard Data</TypographyHeader>
  </div>


</template>