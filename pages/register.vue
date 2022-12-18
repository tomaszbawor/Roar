<script lang="ts" setup>
import { definePageMeta, registerWithEmail } from "#imports";
import { reactive } from "vue";

definePageMeta({
  layout: "centered-forms"
});

const registerForm = reactive({
  email: "",
  password: "",
  passwordConfirm: "",
  termsAccepted: false
});


const canRegister = (): boolean => {
  return registerForm.termsAccepted;
};


const postRegisterForm = async () => {
  await registerWithEmail(registerForm.email, registerForm.password, registerForm.passwordConfirm);
};
</script>
<template>
  <section class="bg-gray-50 dark:bg-gray-900">
    <div
      class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
    >
      <a
        class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        href="#"
      >
        ROAR
      </a>
      <div
        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
          >
            Create and account
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
                v-model:value="registerForm.email"
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
                v-model:value="registerForm.password"
                name="password"
                placeholder="password"
                size="large"
                type="password"
              />

            </div>
            <div>
              <label
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                for="confirm-password"
              >Confirm password</label
              >
              <n-input
                id="confirm-password"
                v-model:value="registerForm.passwordConfirm"
                name="confirm-password"
                placeholder="confirmPassword"
                size="large"
                type="password"
              />
            </div>
            <div class="flex items-start">
              <div class="flex items-center h-5">

                <div class="ml-3 text-sm">

                  <n-checkbox v-model:checked="registerForm.termsAccepted">
                    <label
                      class="font-light text-gray-500 dark:text-gray-300"
                      for="terms"
                    >I accept the
                      <nuxt-link
                        class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                        href="/terms"
                      >Terms and Conditions
                      </nuxt-link
                      >
                    </label></n-checkbox>
                </div>

              </div>

            </div>


            <n-button :disabled="!canRegister()" class="w-full" strong tertiary
                      type="success" @click.prevent="postRegisterForm">
              Register
            </n-button>

            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              Already have an account?
              <a
                class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                href="/login"
              >Login here</a
              >
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
