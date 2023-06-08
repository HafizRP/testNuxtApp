<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import {
  initAccordions,
  initCarousels,
  initCollapses,
  initDials,
  initDismisses,
  initDrawers,
  initDropdowns,
  initModals,
  initPopovers,
  initTabs,
  initTooltips,
} from "flowbite";

// initialize components based on data attribute selectors
onMounted(() => {
  // initAccordions();
  // initCarousels();
  // initCollapses();
  // initDials();
  // initDismisses();
  // initDrawers();
  // initDropdowns();
  // initModals();
  // initPopovers();
  // initTabs();
  // initTooltips();


  if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
    useState('darkMode', () => true)
  } else {
    document.documentElement.classList.remove('dark')
    useState('darkMode', () => false)
  }

});
</script>
