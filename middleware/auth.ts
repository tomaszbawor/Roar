import { useUser } from "#imports";

export default defineNuxtRouteMiddleware(async () => {
  const user = await useUser();
  if (!user) {
    return "/";
  }
});
