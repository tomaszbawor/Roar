<script setup lang="ts">
import {useState} from "#app";

const data = useState('user').value
</script>
<template>
  <h1>Dashboard {{ data }}</h1>

</template>