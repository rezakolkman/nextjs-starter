import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex min-h-svh flex-col bg-background">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
              B
            </div>
            <span className="font-semibold">Bangun</span>
          </div>
          <Button asChild size="sm">
            <Link href="/signin">Sign in</Link>
          </Button>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-6 py-16">
        <div className="mx-auto w-full max-w-md space-y-4 text-center">
          <p className="text-sm font-medium text-muted-foreground">
            Construction management
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">
            Manage projects in one place
          </h1>
          <p className="text-muted-foreground">
            Bangun helps you track jobs, clients, and progress.
          </p>
        </div>
      </main>
    </div>
  );
}
