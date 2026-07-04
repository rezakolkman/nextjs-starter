import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "@/lib/auth.config";
import { prisma } from "@/lib/prisma";

// Phase 1 = single org (Gregory's). There is no onboarding UI yet — the first
// time any user signs in without an orgId, we find-or-create the one default
// org and attach them to it. The very first user to ever hit this path becomes
// ADMIN; everyone after that defaults to STAFF (promote manually in the DB for now).
// Reassess this once nira actually needs multiple orgs (Phase 3).
async function assignDefaultOrg(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { orgId: true },
  });
  if (!user || user.orgId) return;

  const org = await prisma.organization.findUnique({ where: { slug: "default" } });
  const isFirstOrg = !org;
  const resolvedOrg =
    org ?? (await prisma.organization.create({ data: { name: "Nira", slug: "default" } }));

  await prisma.user.update({
    where: { id: userId },
    data: { orgId: resolvedOrg.id, role: isFirstOrg ? "ADMIN" : "STAFF" },
  });
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  callbacks: {
    async signIn({ user }) {
      if (user.id) await assignDefaultOrg(user.id);
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        const dbUser = await prisma.user.findUnique({
          where: { id: user.id },
          select: { orgId: true, role: true },
        });
        token.orgId = dbUser?.orgId ?? null;
        token.role = dbUser?.role ?? "STAFF";
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      session.user.orgId = token.orgId as string | null;
      session.user.role = token.role as "ADMIN" | "STAFF";
      return session;
    },
  },
});
