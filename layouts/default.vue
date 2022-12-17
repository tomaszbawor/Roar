<template>
  <div class="h-screen">
    <LayoutNavBar />
    <div
      class="grid justify-items-center flex h-full items-top dark:bg-slate-900 dark:text-white"
    >
      <slot />
    </div>
  </div>
</template>

<style scoped></style>
