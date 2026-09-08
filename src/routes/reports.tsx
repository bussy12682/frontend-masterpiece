import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, Panel, Field, SelectBox, GradePill } from "@/components/app-shell";
import { classes, grade, resultSubjects, school, sessions, terms } from "@/lib/edu-data";
import { Download, FileSpreadsheet, GraduationCap } from "lucide-react";

export const Route = createFileRoute("/reports")({
  head: () => ({
    meta: [
      { title: "Reports — EduTrack" },
      { name: "description", content: "Generate student, class, subject and attendance academic reports." },
      { property: "og:title", content: "Reports — EduTrack" },
      { property: "og:description", content: "Generate student, class, subject and attendance reports." },
    ],
  }),
  component: ReportsPage,
});

const tabs = ["Student Report", "Class Report", "Subject Report", "Attendance Report"];

function ReportsPage() {
  const [tab, setTab] = useState(tabs[0]);
  const rows = resultSubjects.map((s) => ({ ...s, total: s.t1 + s.t2 + s.exam }));
  const total = rows.reduce((a, r) => a + r.total, 0);

  return (
    <AppShell title="Reports" subtitle="Generate and view academic reports.">
      <Panel>
        <div className="flex flex-wrap gap-1 border-b border-border">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`-mb-px border-b-2 px-4 py-2.5 text-sm transition-colors ${
                tab === t
                  ? "border-primary font-medium text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-5 xl:items-end">
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
            Generate Report
          </button>
        </div>
      </Panel>

      <Panel className="mt-6" title={tab} description="Preview of the generated report">
        <div className="mb-5 flex flex-wrap gap-2">
          <button className="inline-flex h-9 items-center gap-2 rounded-md bg-destructive px-3 text-sm font-medium text-destructive-foreground hover:opacity-90">
            <Download className="size-4" /> Download PDF
          </button>
          <button className="inline-flex h-9 items-center gap-2 rounded-md bg-success px-3 text-sm font-medium text-primary-foreground hover:opacity-90">
            <FileSpreadsheet className="size-4" /> Export Excel
          </button>
        </div>

        <div className="rounded-lg border border-border p-5">
          <div className="flex items-center gap-3 border-b border-border pb-4">
            <span className="grid size-10 place-items-center rounded-md bg-navy">
              <GraduationCap className="size-5 text-navy-foreground" />
            </span>
            <div>
              <p className="font-display font-semibold">{school.name}</p>
              <p className="text-xs text-muted-foreground">Academic Report · {school.address}</p>
            </div>
          </div>

          <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
            <div className="flex gap-2">
              <dt className="text-muted-foreground">Name:</dt>
              <dd className="font-medium">John Doe</dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-muted-foreground">Student ID:</dt>
              <dd className="font-medium">EDU-2036-0001</dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-muted-foreground">Class:</dt>
              <dd className="font-medium">SS1A</dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-muted-foreground">Session / Term:</dt>
              <dd className="font-medium">2026/2027 · First Term</dd>
            </div>
          </dl>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[560px] text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                  <th className="py-2.5 pr-4 font-medium">No.</th>
                  <th className="py-2.5 pr-4 font-medium">Subject</th>
                  <th className="py-2.5 pr-4 font-medium">Test 1</th>
                  <th className="py-2.5 pr-4 font-medium">Test 2</th>
                  <th className="py-2.5 pr-4 font-medium">Exam</th>
                  <th className="py-2.5 pr-4 font-medium">Total</th>
                  <th className="py-2.5 font-medium">Grade</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={r.subject} className="border-b border-border last:border-0">
                    <td className="py-2.5 pr-4 text-muted-foreground">{i + 1}</td>
                    <td className="py-2.5 pr-4">{r.subject}</td>
                    <td className="py-2.5 pr-4">{r.t1}</td>
                    <td className="py-2.5 pr-4">{r.t2}</td>
                    <td className="py-2.5 pr-4">{r.exam}</td>
                    <td className="py-2.5 pr-4 font-semibold">{r.total}</td>
                    <td className="py-2.5">
                      <GradePill value={grade(r.total)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-4">
            {[
              ["Total Score", String(total)],
              ["Average", `${(total / rows.length).toFixed(1)}%`],
              ["Position", "1st"],
              ["Attendance", "95%"],
            ].map(([l, v]) => (
              <div key={l} className="rounded-md bg-secondary px-4 py-3">
                <p className="text-xs text-muted-foreground">{l}</p>
                <p className="font-display text-lg font-semibold">{v}</p>
              </div>
            ))}
          </div>
        </div>
      </Panel>
    </AppShell>
  );
}
