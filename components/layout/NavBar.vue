<script lang="ts" setup>
import { userLogout } from "#imports";
import ProfileNavbarBadge from "~/components/layout/ProfileNavbarBadge.vue";
import { useState } from "#app";
import { Maybe } from "~/utils/Maybe";
import { IUser } from "~/types/IUser";

const user = await useState<Maybe<IUser>>("user");

const logout = async () => {
  await userLogout();
};


</script>
<template>
  <header>
    <nav class="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
      <div
        class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl"
      >
        <nuxt-link class="flex items-center" href="/">
          <span
            class="self-center text-xl font-semibold whitespace-nowrap dark:text-white"
          >ROAR</span
          >
        </nuxt-link>
        <div class="flex items-center lg:order-2">
          <ProfileNavbarBadge v-if="user" class="mr-4" />

          <div v-if="!user">
            <nuxt-link
              class="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
              href="/login"
            >Log in
            </nuxt-link
            >
            <nuxt-link class="btn-primary" href="/register">Register</nuxt-link>
          </div>

          <button v-if="user" class="btn-primary" @click="logout">
            Log out
          </button>
          <!-- Temporary Disable changing modes -->
          <!-- <LayoutDarkModeButton/> -->

        </div>
        <div
          class="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
        >
          <ul
            class="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0"
          >

            <li>
              <nuxt-link
                aria-current="page"
                class="block py-2 pr-4 pl-3 text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white"
                href="/news"
              >
                News
              </nuxt-link>
            </li>

            <li>
              <nuxt-link
                aria-current="page"
                class="block py-2 pr-4 pl-3 text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white"
                href="https://discord.gg/Axbxy3um"
              >
                Join Discord
              </nuxt-link>
            </li>


            <li>
              <nuxt-link
                aria-current="page"
                class="block py-2 pr-4 pl-3 text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white"
                href="https://github.com/tomaszbawor/Roar"
              >
                Github
              </nuxt-link>
            </li>

            <li>
              <nuxt-link
                class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                href="/support"
              >Support
              </nuxt-link
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>
