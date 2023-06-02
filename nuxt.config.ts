// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  pages: true,
  ssr: false,
  modules: ["@nuxtjs/tailwindcss"],
  css: ["@/assets/css/style.css"],
});
