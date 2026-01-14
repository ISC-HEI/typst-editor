import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import bcrypt from 'bcrypt';

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
            return null;
        }

        try {
          const user = await prisma.user.findUnique({
            where: { email: String(credentials.email) }
          })
          
          if (user && user.password) {
            const passwordsMatch = await bcrypt.compare(
              String(credentials.password), 
              user.password
            );

            if (passwordsMatch) {
              return {
                id: user.id.toString(),
                email: user.email,
              };
            }
          }
          console.log("Invalid credentials");
          return null
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
})