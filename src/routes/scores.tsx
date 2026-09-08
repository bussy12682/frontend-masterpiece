import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, Panel, Field, SelectBox, GradePill } from "@/components/app-shell";
import { classes, grade, scoreRows, sessions, subjects, terms } from "@/lib/edu-data";
import { Save } from "lucide-react";

export const Route = createFileRoute("/scores")({
  head: () => ({
    meta: [
      { title: "Score Entry — EduTrack" },
      { name: "description", content: "Record test and examination scores for your assigned classes." },
      { property: "og:title", content: "Score Entry — EduTrack" },
      { property: "og:description", content: "Record test and examination scores." },
    ],
  }),
  component: ScoresPage,
});

function ScoresPage() {
  const [rows, setRows] = useState(scoreRows);

  const update = (i: number, key: "t1" | "t2" | "exam", value: number, max: number) => {
    setRows((prev) =>
      prev.map((r, idx) => (idx === i ? { ...r, [key]: Math.max(0, Math.min(max, value || 0)) } : r)),
    );
  };

  return (
    <AppShell
      title="Enter student scores"
      subtitle="Record test and examination scores for your assigned classes."
      actions={
        <button className="inline-flex h-9 items-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          <Save className="size-4" /> Save Scores
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
          <Field label="Subject">
            <SelectBox options={subjects.map((s) => s.name)} />
          </Field>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="py-3 pr-4 font-medium">Student</th>
                <th className="py-3 pr-4 font-medium">Test 1 (20)</th>
                <th className="py-3 pr-4 font-medium">Test 2 (20)</th>
                <th className="py-3 pr-4 font-medium">Exam (60)</th>
                <th className="py-3 pr-4 font-medium">Total (100)</th>
                <th className="py-3 font-medium">Grade</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => {
                const total = r.t1 + r.t2 + r.exam;
                return (
                  <tr key={r.student} className="border-b border-border last:border-0">
                    <td className="py-2 pr-4 font-medium">{r.student}</td>
                    {(
                      [
                        ["t1", 20],
                        ["t2", 20],
                        ["exam", 60],
                      ] as const
                    ).map(([key, max]) => (
                      <td key={key} className="py-2 pr-4">
                        <input
                          type="number"
                          value={r[key]}
                          min={0}
                          max={max}
                          onChange={(e) => update(i, key, Number(e.target.value), max)}
                          className="h-9 w-20 rounded-md border border-border bg-card px-2 text-sm outline-none focus:border-primary"
                        />
                      </td>
                    ))}
                    <td className="py-2 pr-4 font-semibold">{total}</td>
                    <td className="py-2">
                      <GradePill value={grade(total)} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <p className="mt-5 text-xs text-muted-foreground">
          Totals and grades are calculated automatically from the configured score distribution.
        </p>
      </Panel>
    </AppShell>
  );
}
