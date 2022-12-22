export default defineNuxtRouteMiddleware(async () => {
  const character = await useCharacter();
  if (!character) {
    return "/character/creation";
  }
});
