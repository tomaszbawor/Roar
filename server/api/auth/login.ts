import { readBody } from "h3";
import { getUserByEmail } from "~/server/repositories/userRepository";
import { makeSession } from "~/server/services/sessionService";
import { comparePasswords } from "~/server/services/passwordHasher";
import {
  sendApiErrorOnFalseCondition,
  sendApiErrorOnNull,
} from "~/server/api/apiErrorsUtil";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const email = body.email;
  const password = body.password;

  const userByEmail = await getUserByEmail(email);

  sendApiErrorOnNull(userByEmail, event, 401, "Unauthenticated");
  const isPasswordCorrect = await comparePasswords(
    userByEmail.password,
    password
  );

  sendApiErrorOnFalseCondition(
    isPasswordCorrect,
    event,
    401,
    "Invalid password"
  );
  return await makeSession(userByEmail, event);
});
