<template>
  <div class="h-screen">
    <LayoutNavBar/>
    <div
        class="grid pt-4 dark:border-gray-300 bg-gray-50 justify-items-center flex h-full items-top dark:bg-slate-900 dark:text-white "
    >
      <slot/>
    </div>
  </div>
</template>

<style scoped></style>
