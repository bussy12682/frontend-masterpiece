import { createFileRoute } from "@tanstack/react-router";
import { AppShell, Panel } from "@/components/app-shell";
import { classes } from "@/lib/edu-data";
import { MoreHorizontal, Pencil, Plus } from "lucide-react";

export const Route = createFileRoute("/classes")({
  head: () => ({
    meta: [
      { title: "Classes — EduTrack" },
      { name: "description", content: "Manage school classes, levels and class arms with student counts." },
      { property: "og:title", content: "Classes — EduTrack" },
      { property: "og:description", content: "Manage school classes, levels and class arms." },
    ],
  }),
  component: ClassesPage,
});

function ClassesPage() {
  return (
    <AppShell
      title="Classes"
      subtitle="Manage school classes and class arms."
      actions={
        <button className="inline-flex h-9 items-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          <Plus className="size-4" /> Add Class
        </button>
      }
    >
      <Panel>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="py-3 pr-4 font-medium">Class Name</th>
                <th className="py-3 pr-4 font-medium">Level</th>
                <th className="py-3 pr-4 font-medium">Arm</th>
                <th className="py-3 pr-4 font-medium">Students</th>
                <th className="py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {classes.map((c) => (
                <tr key={c.name} className="border-b border-border last:border-0">
                  <td className="py-3 pr-4 font-medium">{c.name}</td>
                  <td className="py-3 pr-4">{c.level}</td>
                  <td className="py-3 pr-4">{c.arm}</td>
                  <td className="py-3 pr-4">{c.students}</td>
                  <td className="py-3">
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <button aria-label="Edit" className="hover:text-primary">
                        <Pencil className="size-4" />
                      </button>
                      <button aria-label="More" className="hover:text-primary">
                        <MoreHorizontal className="size-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-5 text-sm text-muted-foreground">Showing 1 – 8 of 8</p>
      </Panel>
    </AppShell>
  );
}
