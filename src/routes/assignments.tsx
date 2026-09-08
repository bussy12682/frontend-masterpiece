import { createFileRoute } from "@tanstack/react-router";
import { AppShell, Panel, Field, SelectBox } from "@/components/app-shell";
import { assignments, classes, sessions, subjects, teachers, terms } from "@/lib/edu-data";
import { Plus, Trash2 } from "lucide-react";

export const Route = createFileRoute("/assignments")({
  head: () => ({
    meta: [
      { title: "Teacher Assignments — EduTrack" },
      { name: "description", content: "Assign teachers to subjects and classes for a session and term." },
      { property: "og:title", content: "Teacher Assignments — EduTrack" },
      { property: "og:description", content: "Assign teachers to subjects and classes." },
    ],
  }),
  component: AssignmentsPage,
});

function AssignmentsPage() {
  return (
    <AppShell title="Assignments" subtitle="Assign teachers to subjects and classes.">
      <div className="grid gap-6 lg:grid-cols-3">
        <Panel title="New assignment" description="Pick a teacher, subject and class">
          <div className="space-y-4">
            <Field label="Teacher">
              <SelectBox options={teachers.map((t) => t.name)} />
            </Field>
            <Field label="Subject">
              <SelectBox options={subjects.map((s) => s.name)} />
            </Field>
            <Field label="Class">
              <SelectBox options={classes.map((c) => c.name)} />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Session">
                <SelectBox options={sessions} />
              </Field>
              <Field label="Term">
                <SelectBox options={terms} />
              </Field>
            </div>
            <button className="inline-flex h-9 w-full items-center justify-center gap-2 rounded-md bg-primary text-sm font-medium text-primary-foreground hover:bg-primary/90">
              <Plus className="size-4" /> Assign
            </button>
          </div>
        </Panel>

        <Panel title="Current assignments" className="lg:col-span-2">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                  <th className="py-3 pr-4 font-medium">Teacher</th>
                  <th className="py-3 pr-4 font-medium">Subject</th>
                  <th className="py-3 pr-4 font-medium">Class</th>
                  <th className="py-3 pr-4 font-medium">Session</th>
                  <th className="py-3 pr-4 font-medium">Term</th>
                  <th className="py-3 font-medium" />
                </tr>
              </thead>
              <tbody>
                {assignments.map((a, i) => (
                  <tr key={i} className="border-b border-border last:border-0">
                    <td className="py-3 pr-4 font-medium">{a.teacher}</td>
                    <td className="py-3 pr-4">{a.subject}</td>
                    <td className="py-3 pr-4">{a.cls}</td>
                    <td className="py-3 pr-4 text-muted-foreground">{a.session}</td>
                    <td className="py-3 pr-4 text-muted-foreground">{a.term}</td>
                    <td className="py-3 text-right">
                      <button aria-label="Remove" className="text-muted-foreground hover:text-destructive">
                        <Trash2 className="size-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      </div>
    </AppShell>
  );
}
