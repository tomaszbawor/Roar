import { createError, eventHandler, readBody, sendError } from "h3";
import { CreateUserRequest } from "~/types/IUser";
import { doesUserExist } from "~/server/services/userService";
import { createUser } from "~/server/repositories/userRepository";
import { makeSession } from "~/server/services/sessionService";
import { hashPassword } from "~/server/services/passwordHasher";

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

  const encryptedPassword: string = await hashPassword(password);

  const userData: CreateUserRequest = {
    email: email,
    password: encryptedPassword,
  };

  const user = await createUser(userData);

  return await makeSession(user, event);
});
