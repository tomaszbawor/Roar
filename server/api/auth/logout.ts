import { deleteCookie, eventHandler } from "h3";

export default eventHandler(async (event) => {
  deleteCookie(event, "auth_token");
});
