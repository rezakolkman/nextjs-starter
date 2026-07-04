import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  return (
    <div className="p-6">
      <p className="text-muted-foreground">
        Welcome back, {session.user?.name?.split(" ")[0] ?? "there"}.
      </p>
    </div>
  );
}
