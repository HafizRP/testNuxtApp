// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  pages: true,
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/supabase", '@nuxtjs/color-mode'],
  css: ["@/assets/css/style.css"],
  tailwindcss: {},
  router: {
    options: {
      linkActiveClass: "nav-link-active"
    }
  },
});
