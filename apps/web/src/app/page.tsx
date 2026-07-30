import type { EngineerOSHealth } from "@engineeros/types";
import { Button } from "@engineeros/ui";

const health: EngineerOSHealth = {
  service: "web",
  status: "ok",
  timestamp: new Date().toISOString()
};

export default function HomePage() {
  return (
    <main className="min-h-screen px-6 py-10 sm:px-10">
      <section className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-5xl flex-col justify-center gap-8">
        <div className="space-y-5">
          <p className="text-sm font-medium uppercase tracking-wide text-teal-700">EngineerOS</p>
          <h1 className="max-w-3xl text-4xl font-semibold leading-tight sm:text-6xl">
            The operating layer for modern engineering teams.
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-[color:var(--muted)]">
            A focused SaaS foundation is ready for product, platform, and workflow features.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button className="h-11 rounded-md bg-teal-700 px-5 text-sm font-semibold text-white transition hover:bg-teal-800">
            Open workspace
          </Button>
          <code className="rounded border border-black/10 bg-white px-3 py-2 text-sm">
            {health.service}:{health.status}
          </code>
        </div>
      </section>
    </main>
  );
}
