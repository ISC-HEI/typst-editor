"use server"

import { signIn } from "@/lib/auth"

export async function loginAction(formData: FormData) {
  try {
    await signIn("credentials", formData)
  } catch (error) {
    if (error instanceof Error && error.message.includes("NEXT_REDIRECT")) {
        throw error;
    }
    console.error("Login error:", error);
    throw error;
  }
}