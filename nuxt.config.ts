// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  pages: true,
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/supabase", '@nuxtjs/color-mode'],
  css: ["@/assets/css/style.css"],
  router: {
    options: {
      linkActiveClass: "nav-link-active"
    }
  },
  colorMode: {
    classSuffix: ''
  },
  app: {
    head: {
      script: [{
        src: "https://apis.google.com/js/api.js"
      }]
    }
  }
});
