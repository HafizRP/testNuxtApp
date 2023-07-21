<template>
  <NuxtLayout>
    <div>
      <NuxtLoadingIndicator /> <!-- here -->
      <NuxtPage />
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">

onMounted(() => {
  // if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  //   document.documentElement.classList.add('dark');
  //   useState('darkMode', () => true)
  // } else {
  //   document.documentElement.classList.remove('dark')
  //   useState('darkMode', () => false)
  // }

})
</script>
