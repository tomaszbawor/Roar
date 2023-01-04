<script lang="ts" setup>

import { User } from "../../../common/User";

const user = useState<User>("user");
const isAdmin: boolean = user && user.value && user.value.role === "ADMIN";

</script>
<template>
  <header v-if="user">
    <nav class="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
      <div
        class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl"
      >

        <div
          id="mobile-menu-2"
          class="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
        >
          <ul
            class="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0"
          >

            <li>
              <nuxt-link
                :active-class="$style.activeLink"
                :class="$style.link"
                aria-current="page"
                href="/character"
              >
                Character
              </nuxt-link>
            </li>

            <li>
              <nuxt-link
                :active-class="$style.activeLink"
                :class="$style.link"
                aria-current="page"
                href="/training"
              >
                Train
              </nuxt-link>
            </li>

            <li>
              <nuxt-link
                :active-class="$style.activeLink"
                :class="$style.link"
                aria-current="page"
                href="/arena"
              >
                Arena
              </nuxt-link>
            </li>


            <li v-if="isAdmin">
              <nuxt-link
                :active-class="$style.activeLink"
                :class="$style.link"
                href="/admin"
              >Admin
              </nuxt-link
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<style module>
.link {
  @apply block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700
}

.activeLink {
  @apply text-gray-100
}

</style>