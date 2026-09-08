import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, Panel } from "@/components/app-shell";
import { ChevronRight, School, Users, CheckSquare } from "lucide-react";

export const Route = createFileRoute("/teacher")({
  head: () => ({
    meta: [
      { title: "Teacher Dashboard — EduTrack" },
      { name: "description", content: "Your assigned classes, students and attendance at a glance." },
      { property: "og:title", content: "Teacher Dashboard — EduTrack" },
      { property: "og:description", content: "Your assigned classes, students and attendance at a glance." },
    ],
  }),
  component: TeacherPage,
});

const myClasses = [
  { cls: "SS1A", subject: "Mathematics", students: 28 },
  { cls: "SS1B", subject: "Mathematics", students: 25 },
  { cls: "SS2A", subject: "Physics", students: 25 },
];

function TeacherPage() {
  return (
    <AppShell
      title="Good morning, Mr. John"
      subtitle="Here's what's happening with your classes today."
      role="Mr. John"
      roleDetail="Teacher"
      userName="JD"
    >
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Your Classes", value: "3", icon: School },
          { label: "Total Students", value: "78", icon: Users },
          { label: "Attendance Today", value: "65%", icon: CheckSquare },
        ].map((s) => (
          <div key={s.label} className="card-surface flex items-center justify-between p-5">
            <div>
              <p className="text-sm text-muted-foreground">{s.label}</p>
              <p className="mt-2 font-display text-3xl font-semibold">{s.value}</p>
            </div>
            <span className="grid size-11 place-items-center rounded-lg bg-accent">
              <s.icon className="size-5 text-primary" />
            </span>
          </div>
        ))}
      </div>

      <Panel title="My assigned classes" description="Tap a class to enter scores or take attendance" className="mt-6">
        <ul className="divide-y divide-border">
          {myClasses.map((c) => (
            <li key={c.cls + c.subject}>
              <Link to="/scores" className="flex items-center gap-4 py-3 transition-colors hover:bg-secondary">
                <span className="grid size-10 place-items-center rounded-lg bg-accent text-sm font-semibold text-primary">
                  {c.cls}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">{c.subject}</p>
                  <p className="text-xs text-muted-foreground">{c.students} students</p>
                </div>
                <ChevronRight className="size-4 text-muted-foreground" />
              </Link>
            </li>
          ))}
        </ul>
      </Panel>
    </AppShell>
  );
}
