import { eventHandler } from "h3";
import { Maybe } from "~/utils/Maybe";
import { IUser } from "~/types/IUser";

export default eventHandler<Maybe<IUser>>(async (event) => {
  return null;
});
