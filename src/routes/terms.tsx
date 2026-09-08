import { createFileRoute } from "@tanstack/react-router";
import { AppShell, Panel } from "@/components/app-shell";
import { terms } from "@/lib/edu-data";
import { CalendarClock } from "lucide-react";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms — EduTrack" },
      { name: "description", content: "Manage the three academic terms, their dates and the current active term." },
      { property: "og:title", content: "Terms — EduTrack" },
      { property: "og:description", content: "Manage academic terms and the active term." },
    ],
  }),
  component: TermsPage,
});

const ranges = ["Sep 2026 – Dec 2026", "Jan 2027 – Apr 2027", "Apr 2027 – Jul 2027"];

function TermsPage() {
  return (
    <AppShell title="Terms" subtitle="Academic terms for the 2026/2027 session.">
      <div className="grid gap-4 sm:grid-cols-3">
        {terms.map((t, i) => (
          <Panel key={t}>
            <span className="grid size-10 place-items-center rounded-lg bg-accent">
              <CalendarClock className="size-5 text-primary" />
            </span>
            <p className="mt-4 font-medium">{t}</p>
            <p className="text-sm text-muted-foreground">{ranges[i]}</p>
            <span
              className={`mt-4 inline-block rounded-full px-3 py-1 text-xs font-medium ${
                i === 0 ? "bg-success/15 text-success" : "bg-secondary text-muted-foreground"
              }`}
            >
              {i === 0 ? "Active term" : "Upcoming"}
            </span>
          </Panel>
        ))}
      </div>
    </AppShell>
  );
}
