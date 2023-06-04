export default defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie("token");

  console.log(typeof token.value);

  //   if (typeof token.value !== "string") {
  //     return abortNavigation();
  //   }

  if (!token.value) {
    return navigateTo("/login");
  }

  //   const token = getCookie("user_info");
  // const token
  //   console.log(token.value);
  //   if (to.params.id === "1") {
  //     return abortNavigation();
  //   }
  //   if (to.path !== "/") {
  //     return navigateTo("/");
  //   }
});
