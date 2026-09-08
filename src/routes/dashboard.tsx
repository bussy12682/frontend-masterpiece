import { createFileRoute } from "@tanstack/react-router";
import { AppShell, Panel } from "@/components/app-shell";
import { activities, performance } from "@/lib/edu-data";
import { Users, GraduationCap, School, BookOpen, UserPlus, PencilLine, FileBarChart } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard — EduTrack" },
      { name: "description", content: "School-wide overview of students, teachers, classes and academic performance." },
      { property: "og:title", content: "Admin Dashboard — EduTrack" },
      { property: "og:description", content: "School-wide overview of students, teachers and performance." },
    ],
  }),
  component: DashboardPage,
});

const stats = [
  { label: "Total Students", value: "248", icon: Users },
  { label: "Total Teachers", value: "18", icon: GraduationCap },
  { label: "Total Classes", value: "12", icon: School },
  { label: "Total Subjects", value: "16", icon: BookOpen },
];

const icons = [UserPlus, PencilLine, GraduationCap, FileBarChart];

function DashboardPage() {
  return (
    <AppShell title="Dashboard" subtitle="Welcome back, Admin! Here's an overview of your school.">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
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

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Panel title="Academic Performance" description="Average and top scores per level" className="lg:col-span-2">
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performance} barGap={6}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                <XAxis dataKey="cls" tickLine={false} axisLine={false} fontSize={12} />
                <YAxis tickLine={false} axisLine={false} fontSize={12} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{
                    borderRadius: 8,
                    border: "1px solid var(--border)",
                    background: "var(--card)",
                    fontSize: 12,
                  }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
                <Bar name="Average Score" dataKey="average" fill="var(--chart-1)" radius={[4, 4, 0, 0]} />
                <Bar name="Top Score" dataKey="top" fill="var(--chart-2)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel title="Recent Activities" description="Latest changes across the school">
          <ul className="space-y-4">
            {activities.map((a, i) => {
              const Icon = icons[i % icons.length];
              return (
                <li key={a.title} className="flex gap-3">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-accent">
                    <Icon className="size-4 text-primary" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium">{a.title}</p>
                    <p className="truncate text-xs text-muted-foreground">{a.detail}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground/70">{a.time}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </Panel>
      </div>
    </AppShell>
  );
}
