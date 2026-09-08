import { createFileRoute } from "@tanstack/react-router";
import { AppShell, Panel, Field, SelectBox, GradePill } from "@/components/app-shell";
import { classes, grade, resultSubjects, sessions, terms } from "@/lib/edu-data";
import { User } from "lucide-react";

export const Route = createFileRoute("/results")({
  head: () => ({
    meta: [
      { title: "Student Results — EduTrack" },
      { name: "description", content: "Generate and review student academic results, totals, averages and positions." },
      { property: "og:title", content: "Student Results — EduTrack" },
      { property: "og:description", content: "Generate and review student academic results." },
    ],
  }),
  component: ResultsPage,
});

function ResultsPage() {
  const rows = resultSubjects.map((s) => ({ ...s, total: s.t1 + s.t2 + s.exam }));
  const total = rows.reduce((a, r) => a + r.total, 0);
  const average = (total / rows.length).toFixed(1);

  return (
    <AppShell title="Student Results" subtitle="View and manage student academic results.">
      <Panel>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5 xl:items-end">
          <Field label="Session">
            <SelectBox options={sessions} />
          </Field>
          <Field label="Term">
            <SelectBox options={terms} />
          </Field>
          <Field label="Class">
            <SelectBox options={classes.map((c) => c.name)} defaultValue="SS1A" />
          </Field>
          <Field label="Student">
            <SelectBox options={["John Doe", "Mary James", "David Paul"]} />
          </Field>
          <button className="h-9 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90">
            Generate
          </button>
        </div>
      </Panel>

      <Panel className="mt-6">
        <div className="flex flex-wrap items-center gap-4 border-b border-border pb-5">
          <span className="grid size-14 place-items-center rounded-full bg-accent">
            <User className="size-6 text-primary" />
          </span>
          <div className="mr-auto">
            <p className="font-display text-lg font-semibold">John Doe</p>
            <p className="text-sm text-muted-foreground">EDU-2036-0001 · SS1A</p>
          </div>
          {[
            ["Total Score", String(total)],
            ["Average", `${average}%`],
            ["Position", "1st"],
          ].map(([l, v]) => (
            <div key={l} className="rounded-lg bg-secondary px-4 py-2">
              <p className="text-xs text-muted-foreground">{l}</p>
              <p className="font-display text-lg font-semibold">{v}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[600px] text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="py-3 pr-4 font-medium">No.</th>
                <th className="py-3 pr-4 font-medium">Subject</th>
                <th className="py-3 pr-4 font-medium">Test 1</th>
                <th className="py-3 pr-4 font-medium">Test 2</th>
                <th className="py-3 pr-4 font-medium">Exam</th>
                <th className="py-3 pr-4 font-medium">Total</th>
                <th className="py-3 font-medium">Grade</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={r.subject} className="border-b border-border last:border-0">
                  <td className="py-3 pr-4 text-muted-foreground">{i + 1}</td>
                  <td className="py-3 pr-4 font-medium">{r.subject}</td>
                  <td className="py-3 pr-4">{r.t1}</td>
                  <td className="py-3 pr-4">{r.t2}</td>
                  <td className="py-3 pr-4">{r.exam}</td>
                  <td className="py-3 pr-4 font-semibold">{r.total}</td>
                  <td className="py-3">
                    <GradePill value={grade(r.total)} />
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
