<script lang="ts" setup>
import { useState } from "#app";
import { IUser } from "~/types/IUser";

const user = useState<IUser>("user");
</script>
<template>
  <div class="dark:text-white">
    You are logged as: <b>{{ user.email }}</b>
  </div>
</template>
