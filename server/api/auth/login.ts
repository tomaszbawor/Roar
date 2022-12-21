import { createError, readBody, sendError } from "h3";
import { getUserByEmail } from "~/server/repositories/userRepository";
import { makeSession } from "~/server/services/sessionService";
import { comparePasswords } from "~/server/services/passwordHasher";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const email = body.email;
  const password = body.password;

  const userByEmail = await getUserByEmail(email);

  if (userByEmail === null) {
    sendError(
      event,
      createError({ statusCode: 401, statusMessage: "Unauthenticated" })
    );
    return;
  }

  const isPasswordCorrect = comparePasswords(userByEmail.password, password);
  // const isPasswordCorrect = bcrypt.compare(password, userByEmail.password);

  if (!isPasswordCorrect) {
    sendError(
      event,
      createError({ statusCode: 401, statusMessage: "Invalid password" })
    );
  }

  return await makeSession(userByEmail, event);
});
