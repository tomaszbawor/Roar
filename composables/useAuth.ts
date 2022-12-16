import { useRouter, useState } from "#app";
import { ISession } from "~/types/ISession";

export async function registerWithEmail(
  email: string,
  password: string,
  confirmPassword: string
) {
  console.log({ email, password, confirmPassword });

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
      await useRouter().push("/dashboard");
    }
  } catch (e: Error) {
    console.log("error: " + e.toString());
  }
}
