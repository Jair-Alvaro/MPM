export default defineNuxtRouteMiddleware((to, _from) => {
  const user = useSupabaseUser();

  // Redirigir a la página principal si el usuario intenta acceder a /login estando autenticado
  if (user.value && to.path === "/login") {
    return navigateTo("/");
  }

  // Permitir acceso a /login si el usuario no está autenticado
  if (!user.value && to.path === "/login") {
    return;
  }

  // Redirigir a /login si el usuario no está autenticado y quiere acceder a cualquier otra ruta
  if (!user.value) {
    return navigateTo("/login");
  }
});
