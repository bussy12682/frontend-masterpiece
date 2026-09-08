import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, Panel, SelectBox } from "@/components/app-shell";
import { classes, sessions, students } from "@/lib/edu-data";
import { MoreHorizontal, Pencil, Plus, Search } from "lucide-react";

export const Route = createFileRoute("/students")({
  head: () => ({
    meta: [
      { title: "Students — EduTrack" },
      { name: "description", content: "Manage and view all student records, classes and enrolment details." },
      { property: "og:title", content: "Students — EduTrack" },
      { property: "og:description", content: "Manage and view all student records." },
    ],
  }),
  component: StudentsPage,
});

function StudentsPage() {
  const [q, setQ] = useState("");
  const rows = students.filter(
    (s) => s.name.toLowerCase().includes(q.toLowerCase()) || s.id.toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <AppShell
      title="Students"
      subtitle="Manage and view all student records."
      actions={
        <button className="inline-flex h-9 items-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          <Plus className="size-4" /> Add Student
        </button>
      }
    >
      <Panel>
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by name or student ID"
              className="h-9 w-full rounded-md border border-border bg-card pl-9 pr-3 text-sm outline-none focus:border-primary"
            />
          </div>
          <SelectBox options={["All Classes", ...classes.map((c) => c.name)]} />
          <SelectBox options={["All Sessions", ...sessions]} />
        </div>

        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="py-3 pr-4 font-medium">ID</th>
                <th className="py-3 pr-4 font-medium">Name</th>
                <th className="py-3 pr-4 font-medium">Class</th>
                <th className="py-3 pr-4 font-medium">Age</th>
                <th className="py-3 pr-4 font-medium">Gender</th>
                <th className="py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((s) => (
                <tr key={s.id} className="border-b border-border last:border-0">
                  <td className="py-3 pr-4 font-mono text-xs text-muted-foreground">{s.id}</td>
                  <td className="py-3 pr-4 font-medium">{s.name}</td>
                  <td className="py-3 pr-4">{s.cls}</td>
                  <td className="py-3 pr-4">{s.age}</td>
                  <td className="py-3 pr-4">{s.gender}</td>
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
              {rows.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-muted-foreground">
                    No students match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground">
          <span>Showing 1 – {rows.length} of 248</span>
          <div className="flex items-center gap-1">
            {["‹", "1", "2", "3", "4", "…", "›"].map((p, i) => (
              <button
                key={i}
                className={`grid size-8 place-items-center rounded-md border border-border ${
                  p === "1" ? "bg-primary text-primary-foreground" : "hover:bg-secondary"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </Panel>
    </AppShell>
  );
}
