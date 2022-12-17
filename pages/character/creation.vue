<script lang="ts" setup>
import { createCharacter } from "~/composables/useCharacter";
import { useRouter } from "#app";
import { Village } from "~/types/ICharacter";

const name = ref("");
const village = ref<Village>("SAND");

const postCreateCharacter = async () => {
  await createCharacter({
    name: name.value,
    village: village.value
  });

  await useRouter().push("/character");
};
</script>

<template>
  <div class="flex-col">
    <div class="flex flex-col items-center justify-center">
      <TypographyHeader>Create Character</TypographyHeader>
      <div
        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div class="py-2 px-4 space-y-4 md:space-y-6">
          <div>
            <label
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              for="name"
            >Your name</label
            >
            <input
              id="name"
              v-model="name"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="email"
              placeholder="Character name"
              type="text"
            />
          </div>

          <div>
            <label
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              for="name"
            >Village</label
            >
            <select
              id="name"
              v-model="village"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="SAND">SAND</option>
              <option value="LEAF">LEAF</option>
              <option value="STONE">STONE</option>
              <option value="CLOUD">CLOUD</option>
              <option value="MIST">MIST</option>
            </select>

          </div>

          <button
            class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            @click.prevent="postCreateCharacter"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  </div>
</template>