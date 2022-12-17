import { useUser } from "#imports";
import { IUserRole } from "~/types/IUserRole";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = await useUser();
  if (user.role !== IUserRole.ADMIN) {
    return "/forbidden";
  }
});
