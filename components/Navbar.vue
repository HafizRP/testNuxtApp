<template>
  <nav class="bg-white border-gray-200 dark:bg-gray-900">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <a href="https://flowbite.com/" class="flex items-center">
        <img src="https://flowbite.com/docs/images/logo.svg" class="h-8 mr-3" alt="Flowbite Logo" />
        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
        </span>
      </a>
      <div class="flex md:order-2">
        <NuxtLink type="button" to="/login" v-if="!user" external
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Get started
        </NuxtLink>

        <div v-else>
          <button id="pill-user-button" data-dropdown-toggle="pill-user-dropdown"
            class="flex items-center text-sm font-medium p-2 text-gray-900 rounded-full hover:text-blue-600 dark:hover:text-blue-500 md:mr-0 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-white"
            type="button">
            <span class="sr-only">Open user menu</span>
            <img class="w-8 h-8 mr-2 rounded-full"
              :src="user.user_metadata.avatar_url || '/docs/images/people/profile-picture-3.jpg'" alt="user photo" />
            {{ user?.user_metadata.first_name || user.user_metadata.user_name }}
            <svg class="w-4 h-4 mx-1.5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"></path>
            </svg>
          </button>

          <div id="pill-user-dropdown"
            class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
            <div class="px-4 py-3 text-sm text-gray-900 dark:text-white space-y-2">
              <div class="font-medium">{{ user.role }}</div>
              <div class="truncate">{{ user.phone || 'Not Configured' }}</div>
            </div>
            <ul class="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownInformdropdownAvatarNameButtonationButton">
              <li>
                <a href="#"
                  class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
              </li>
              <li>
                <a href="#"
                  class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
              </li>
              <li>
                <div class="inline-flex justify-between w-full px-4">
                  <span class="my-auto cursor-default">Dark Mode</span>
                  <div>
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" value="" class="sr-only peer" @change="darkMode" :checked="isDarkMode">
                      <div
                        class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
                      </div>
                    </label>
                  </div>
                </div>
              </li>
            </ul>
            <div class="py-2">
              <a @click="logout"
                class="block px-4 py-2 text-sm cursor-pointer text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                Sign out
              </a>
            </div>
          </div>
        </div>

        <button data-collapse-toggle="navbar-section" type="button"
          class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-section" aria-expanded="false">
          <span class="sr-only">Open main menu</span>
          <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clip-rule="evenodd"></path>
          </svg>
        </button>
      </div>
      <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-section">
        <ul
          class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
          <li>
            <NuxtLink to="/" class="nav-item" aria-current="page">Home</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/notes"
              class="block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
              Notes</NuxtLink>
          </li>
          <li>
            <a href="#"
              class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Services</a>
          </li>
          <li>
            <a href="#"
              class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contact</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { initFlowbite } from 'flowbite';

const nuxtApp = useNuxtApp()
const user = useSupabaseUser();
const supabase = useSupabaseClient();
const isDarkMode = useState<boolean>('darkMode')

const colorMode = useColorMode()


nuxtApp.hook('page:finish', () => {
  initFlowbite()
})

async function darkMode() {
  if (colorMode.value == 'dark') {
    colorMode.preference = "light"
  } else {
    colorMode.preference = "dark"
  }

  // if (localStorage.getItem('color-theme')) {
  //   if (localStorage.getItem('color-theme') === 'light') {
  //     document.documentElement.classList.add('dark');
  //     localStorage.setItem('color-theme', 'dark');
  //     isDarkMode.value = true
  //   } else {
  //     document.documentElement.classList.remove('dark');
  //     localStorage.setItem('color-theme', 'light');
  //     isDarkMode.value = false
  //   }

  //   // if NOT set via local storage previously
  // } else {
  //   if (document.documentElement.classList.contains('dark')) {
  //     document.documentElement.classList.remove('dark');
  //     localStorage.setItem('color-theme', 'light');
  //   } else {
  //     document.documentElement.classList.add('dark');
  //     localStorage.setItem('color-theme', 'dark');
  //   }
  // }
}



async function logout() {
  await supabase.auth.signOut();
  return navigateTo("/", { external: true });
}
</script>
