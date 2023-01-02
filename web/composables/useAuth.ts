import {
  useCookie,
  useFetch,
  useRequestHeaders,
  useRouter,
  useState,
} from "#app";
import { Session } from "../../common/Session";
import { User } from "../../common/User";

export const userAuthCookie = () => useCookie("connect.sid");

export async function userLogout() {
  await useFetch("/api/auth/logout");
  useState("user").value = null;
  await useRouter().push("/");
}

export async function registerWithEmail(
  email: string,
  password: string,
  confirmPassword: string
) {
  try {
    const res = await $fetch<Session>("/api/auth/register", {
      method: "POST",
      body: {
        email,
        password,
        confirmPassword,
      },
    });

    if (res) {
      useState("user").value = res;
      await useRouter().push("/character");
    }
  } catch (e) {
    console.log("error: ", e);
  }
}

export async function loginWithEmail(email: string, password: string) {
  const user = await $fetch<User>("/api/auth/login", {
    method: "POST",
    body: {
      email,
      password,
    },
  });

  if (user) {
    useState("user").value = user;
    await useRouter().push("/character");
  }
}

export async function useUser(): Promise<User> {
  const authCookie = userAuthCookie().value;
  const user = useState<User>("user");

  if (authCookie && !user.value) {
    const { data } = await useFetch("/api/auth/getByAuthToken", {
      headers: useRequestHeaders(["cookie"]) as Record<"cookie", string>, // make types happy
    });

    if (data.value) {
      user.value = data.value;
    }
  }
  return user.value;
}
