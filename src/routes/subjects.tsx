import { createFileRoute } from "@tanstack/react-router";
import { AppShell, Panel } from "@/components/app-shell";
import { subjects } from "@/lib/edu-data";
import { BookOpen, Plus } from "lucide-react";

export const Route = createFileRoute("/subjects")({
  head: () => ({
    meta: [
      { title: "Subjects — EduTrack" },
      { name: "description", content: "All subjects offered, their codes and the teachers responsible." },
      { property: "og:title", content: "Subjects — EduTrack" },
      { property: "og:description", content: "All subjects offered and the teachers responsible." },
    ],
  }),
  component: SubjectsPage,
});

function SubjectsPage() {
  return (
    <AppShell
      title="Subjects"
      subtitle="Manage the subjects offered across the school."
      actions={
        <button className="inline-flex h-9 items-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          <Plus className="size-4" /> Add Subject
        </button>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {subjects.map((s) => (
          <Panel key={s.code}>
            <div className="flex items-start gap-3">
              <span className="grid size-10 place-items-center rounded-lg bg-accent">
                <BookOpen className="size-5 text-primary" />
              </span>
              <div className="min-w-0">
                <p className="font-medium">{s.name}</p>
                <p className="text-xs text-muted-foreground">Code {s.code}</p>
              </div>
            </div>
            <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div>
                <dt className="text-xs text-muted-foreground">Teacher</dt>
                <dd className="truncate">{s.teacher}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Classes</dt>
                <dd>{s.classes}</dd>
              </div>
            </dl>
          </Panel>
        ))}
      </div>
    </AppShell>
  );
}
