import {
  useCookie,
  useFetch,
  useRequestHeaders,
  useRouter,
  useState,
} from "#app";
import { ISession } from "../../common/ISession";
import { IUser } from "../../common/IUser";

export const userAuthCookie = () => useCookie("auth_token");

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
    const res = await $fetch<ISession>("/api/auth/register", {
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
  const user = await $fetch<IUser>("/api/auth/login", {
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

export async function useUser(): Promise<IUser> {
  const authCookie = userAuthCookie().value;
  const user = useState<IUser>("user");

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
