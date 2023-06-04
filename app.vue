<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
// import { initFlowbite } from 'flowbite'

// // initialize components based on data attribute selectors
// onMounted(() => {
//   initFlowbite();
// })

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
  initTooltips
} from 'flowbite'

// initialize components based on data attribute selectors
onMounted(() => {
  initAccordions();
  initCarousels();
  initCollapses();
  initDials();
  initDismisses();
  initDrawers();
  initDropdowns();
  initModals();
  initPopovers();
  initTabs();
  initTooltips();
})
</script>
