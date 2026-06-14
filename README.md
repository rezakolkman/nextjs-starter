# Next.js Starter

A starter template for Next.js projects with:

- Next.js 16 (App Router, TypeScript, Tailwind CSS v4)
- Auth.js (NextAuth v5) with Google OAuth
- Prisma 7 + Neon PostgreSQL
- shadcn/ui with sidebar layout

## Setup

1. Clone the repo and install dependencies:

```bash
npm install
```

2. Copy environment variables:

```bash
cp .env.example .env.local
```

3. Fill in `.env.local` with your Neon, Auth.js, and Google OAuth credentials.

4. Push the database schema:

```bash
npx prisma db push
```

5. Start the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Google OAuth

Add these authorized redirect URIs in Google Cloud Console:

- `http://localhost:3000/api/auth/callback/google`
- `https://your-domain.com/api/auth/callback/google`
