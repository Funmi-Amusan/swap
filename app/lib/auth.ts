import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '@/app/lib/prisma';
import { v4 as uuidv4 } from 'uuid';

// Simple password hash (in production, use bcrypt)
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@swapped.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'admin@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password required');
        }

        // Check credentials
        if (credentials.email === ADMIN_EMAIL && credentials.password === ADMIN_PASSWORD) {
          // Find or create user
          let user = await prisma.user.findUnique({
            where: { email: ADMIN_EMAIL },
          });

          if (!user) {
            user = await prisma.user.create({
              data: {
                  id: uuidv4(),
                email: ADMIN_EMAIL,
                name: 'Admin',
                isAdmin: true,
              },
            });
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            isAdmin: user.isAdmin,
          };
        }

        throw new Error('Invalid credentials');
      },
    }),
  ],
  pages: {
    signIn: '/admin/login',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.isAdmin = (user as any).isAdmin;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).isAdmin = token.isAdmin;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || 'your-secret-key-change-this',
};
