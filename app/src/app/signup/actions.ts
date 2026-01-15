"use server"

import { signIn } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

type ActionResponse = string | null | undefined;

export async function signUpAction(prevState: ActionResponse, formData: FormData): Promise<ActionResponse> {
  try {
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return "User already exists."
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    })

    await signIn("credentials", {
        email,
        password,
        redirectTo: "/dashboard"
    })

  } catch (error) {
    if (error instanceof Error && error.message.includes("NEXT_REDIRECT")) {
      throw error
    }
    
    console.error("Sign up error:", error)
    return "An error occurred during registration."
  }
}