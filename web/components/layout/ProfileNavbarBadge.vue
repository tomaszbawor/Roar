<script lang="ts" setup>
import { useState } from "#app";
import { User } from "../../../common/User";

const user = useState<User>("user");
</script>
<template>
  <div class="dark:text-white">
    You are logged as: <b>{{ user.email }}</b>
  </div>
</template>
