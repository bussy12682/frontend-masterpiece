import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, Panel, Field, SelectBox } from "@/components/app-shell";
import { attendanceRows, classes, sessions, terms } from "@/lib/edu-data";
import { Save } from "lucide-react";

export const Route = createFileRoute("/attendance")({
  head: () => ({
    meta: [
      { title: "Attendance — EduTrack" },
      { name: "description", content: "Mark and review daily student attendance for any class and date." },
      { property: "og:title", content: "Attendance — EduTrack" },
      { property: "og:description", content: "Mark and review daily student attendance." },
    ],
  }),
  component: AttendancePage,
});

const statuses = ["Present", "Absent", "Late"] as const;

function AttendancePage() {
  const [rows, setRows] = useState(attendanceRows);

  return (
    <AppShell
      title="Record attendance"
      subtitle="Mark student attendance for a specific date."
      actions={
        <button className="inline-flex h-9 items-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          <Save className="size-4" /> Save Attendance
        </button>
      }
    >
      <Panel>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <Field label="Session">
            <SelectBox options={sessions} />
          </Field>
          <Field label="Term">
            <SelectBox options={terms} />
          </Field>
          <Field label="Class">
            <SelectBox options={classes.map((c) => c.name)} defaultValue="SS1A" />
          </Field>
          <Field label="Date">
            <input
              type="date"
              defaultValue="2026-09-07"
              className="h-9 w-full rounded-md border border-border bg-card px-3 text-sm outline-none focus:border-primary"
            />
          </Field>
        </div>

        <ul className="mt-6 divide-y divide-border">
          {rows.map((r, i) => (
            <li key={r.student} className="flex flex-wrap items-center justify-between gap-3 py-3">
              <span className="text-sm font-medium">{r.student}</span>
              <div className="flex gap-2">
                {statuses.map((s) => {
                  const active = r.status === s;
                  const tone =
                    s === "Present"
                      ? "bg-success text-primary-foreground"
                      : s === "Absent"
                        ? "bg-destructive text-destructive-foreground"
                        : "bg-warning text-navy";
                  return (
                    <button
                      key={s}
                      onClick={() =>
                        setRows((prev) => prev.map((x, idx) => (idx === i ? { ...x, status: s } : x)))
                      }
                      className={`h-8 rounded-md px-3 text-xs font-medium transition-colors ${
                        active ? tone : "border border-border text-muted-foreground hover:bg-secondary"
                      }`}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-5 text-sm text-muted-foreground">Showing 1 – {rows.length} of 26</p>
      </Panel>
    </AppShell>
  );
}
