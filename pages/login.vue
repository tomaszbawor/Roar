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
  return (!!email.value && !!password.value);
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

              <n-input
                id="email"
                v-model:value="email"
                name="email"
                placeholder="name@company.com"
                size="large"
                type="text"
              />

            </div>
            <div>
              <label
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                for="password"
              >Password</label
              >

              <n-input
                id="password"
                v-model:value="password"
                name="password"
                placeholder="password"
                size="large"
                type="password"
              />
            </div>

            <n-button :disabled="!canClickLogin()" class="w-full" strong tertiary type="success"
                      @click.prevent="postLoginForm">
              Log In
            </n-button>


          </form>
        </div>
      </div>
    </div>
  </section>
</template>
