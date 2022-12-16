import { createError, eventHandler, readBody, sendError } from "h3";
import bcrypt from "bcrypt";
import { IUser } from "~/types/IUser";
import { doesUserExist } from "~/server/services/userService";
import { createUser } from "~/server/repositories/userRepository";

export default eventHandler(async (event) => {
  const body = await readBody(event);
  const email = body.email;
  const password = body.password;
  const confirmPassword = body.confirmPassword;

  const userExists: boolean = await doesUserExist(email);

  if (userExists) {
    sendError(
      event,
      createError({ statusCode: 422, statusMessage: "User already exists" })
    );
  }

  if (password !== confirmPassword) {
    sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: "Passwords does not match",
      })
    );
  }

  const encryptedPassword: string = await bcrypt.hash(password, 10);

  const userData: IUser = {
    email: email,
    password: encryptedPassword,
  };

  const user = await createUser(userData);

  // return await makeSession(user,event)
  return user;
});
