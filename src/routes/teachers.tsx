import { createFileRoute } from "@tanstack/react-router";
import { AppShell, Panel } from "@/components/app-shell";
import { teachers } from "@/lib/edu-data";
import { Pencil, Plus, Trash2 } from "lucide-react";

export const Route = createFileRoute("/teachers")({
  head: () => ({
    meta: [
      { title: "Teachers — EduTrack" },
      { name: "description", content: "View teaching staff, their subjects and assigned class load." },
      { property: "og:title", content: "Teachers — EduTrack" },
      { property: "og:description", content: "View teaching staff, subjects and class load." },
    ],
  }),
  component: TeachersPage,
});

function TeachersPage() {
  return (
    <AppShell
      title="Teachers"
      subtitle="Manage teaching staff and their subject assignments."
      actions={
        <button className="inline-flex h-9 items-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          <Plus className="size-4" /> Add Teacher
        </button>
      }
    >
      <Panel>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="py-3 pr-4 font-medium">Staff ID</th>
                <th className="py-3 pr-4 font-medium">Name</th>
                <th className="py-3 pr-4 font-medium">Email</th>
                <th className="py-3 pr-4 font-medium">Main Subject</th>
                <th className="py-3 pr-4 font-medium">Classes</th>
                <th className="py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((t) => (
                <tr key={t.id} className="border-b border-border last:border-0">
                  <td className="py-3 pr-4 font-mono text-xs text-muted-foreground">{t.id}</td>
                  <td className="py-3 pr-4 font-medium">{t.name}</td>
                  <td className="py-3 pr-4 text-muted-foreground">{t.email}</td>
                  <td className="py-3 pr-4">{t.subject}</td>
                  <td className="py-3 pr-4">{t.classes}</td>
                  <td className="py-3">
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <button aria-label="Edit" className="hover:text-primary">
                        <Pencil className="size-4" />
                      </button>
                      <button aria-label="Delete" className="hover:text-destructive">
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </AppShell>
  );
}
