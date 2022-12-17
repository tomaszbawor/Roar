<script lang="ts" setup>
import { definePageMeta } from "#imports";
import { loginWithEmail } from "~/composables/useAuth";
import { ref } from "vue";

definePageMeta({
  layout: "centered-forms"
});

const email = ref<string | null>("elo");
const password = ref<string | null>("elo");

const postLoginForm = async () => {
  console.log("Posting login form");
  if (email.value !== null && password.value !== null) {
    await loginWithEmail(email.value, password.value);
  }
};

const canClickLogin = (): boolean => {
  return email.value !== null && password.value !== null;
};
</script>
<template>
  <section class="bg-gray-50 dark:bg-gray-900">
    <pre>
      Email: {{ email }}
      Password: {{ password }}
    </pre>
    <div
      class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
    >
      <a class="flex items-center" href="https://google.com">
        <span
          class="self-center text-xl font-semibold whitespace-nowrap dark:text-white"
        >ROAR</span
        >
      </a>
      <div
        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
          >
            LogIn
          </h1>
          <form action="#" class="space-y-4 md:space-y-6">
            <div>
              <label
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                for="email"
              >Your email</label
              >
              <input
                id="email"
                v-model="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name="email"
                placeholder="name@company.com"
                type="email"
              />
            </div>
            <div>
              <label
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                for="password"
              >Password</label
              >
              <input
                id="password"
                v-model="password"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name="password"
                placeholder="••••••••"
                type="password"
              />
            </div>

            <button
              :disabled="!canClickLogin()"
              class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              @click.prevent="postLoginForm"
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
