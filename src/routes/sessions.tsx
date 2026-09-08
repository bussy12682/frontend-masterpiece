import { createFileRoute } from "@tanstack/react-router";
import { AppShell, Panel } from "@/components/app-shell";
import { sessions } from "@/lib/edu-data";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/sessions")({
  head: () => ({
    meta: [
      { title: "Academic Sessions — EduTrack" },
      { name: "description", content: "Create and manage academic sessions and set the active school year." },
      { property: "og:title", content: "Academic Sessions — EduTrack" },
      { property: "og:description", content: "Create and manage academic sessions." },
    ],
  }),
  component: SessionsPage,
});

function SessionsPage() {
  return (
    <AppShell
      title="Academic Sessions"
      subtitle="Create sessions and set the active school year."
      actions={
        <button className="inline-flex h-9 items-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          <Plus className="size-4" /> Add Session
        </button>
      }
    >
      <Panel>
        <ul className="divide-y divide-border">
          {sessions.map((s, i) => (
            <li key={s} className="flex items-center justify-between py-4">
              <div>
                <p className="font-medium">{s}</p>
                <p className="text-xs text-muted-foreground">September {s.slice(0, 4)} – July {s.slice(5)}</p>
              </div>
              {i === 0 ? (
                <span className="rounded-full bg-success/15 px-3 py-1 text-xs font-medium text-success">Active</span>
              ) : (
                <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
                  Closed
                </span>
              )}
            </li>
          ))}
        </ul>
      </Panel>
    </AppShell>
  );
}
