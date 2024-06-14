
export default defineNuxtRouteMiddleware((to, _from) => {
  const user = useSupabaseUser();

  if (to.path === "/login" && user.value) {
    return navigateTo("/");
  }

  if (to.path !== "/login" && !user.value) {
    return navigateTo("/login");
  }
});