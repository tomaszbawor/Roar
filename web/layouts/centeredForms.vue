<template>
  <div class="h-screen">
    <LayoutNavBar />
    <div class="pt-4 dark:border-gray-300 bg-gray-50 h-full dark:bg-slate-900 dark:text-white">
      <div class="max-w-screen-xl mx-auto flex flex-col">
        <slot />
      </div>
    </div>
  </div>
</template>
