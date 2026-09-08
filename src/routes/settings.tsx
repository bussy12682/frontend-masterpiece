import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, Panel, Field } from "@/components/app-shell";
import { school } from "@/lib/edu-data";
import { Bell, Building2, CalendarDays, Camera, Percent, ShieldCheck, Sliders, Users } from "lucide-react";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — EduTrack" },
      { name: "description", content: "Configure school information, grading rules, score weights and user access." },
      { property: "og:title", content: "Settings — EduTrack" },
      { property: "og:description", content: "Configure school information and grading rules." },
    ],
  }),
  component: SettingsPage,
});

const sections = [
  { key: "school", label: "School Information", icon: Building2 },
  { key: "sessions", label: "Academic Sessions", icon: CalendarDays },
  { key: "scores", label: "Score Configuration", icon: Percent },
  { key: "grading", label: "Grading Rules", icon: ShieldCheck },
  { key: "users", label: "User Management", icon: Users },
  { key: "notifications", label: "Notifications", icon: Bell },
  { key: "system", label: "System Preferences", icon: Sliders },
];

const inputClass =
  "h-9 w-full rounded-md border border-border bg-card px-3 text-sm outline-none focus:border-primary";

function SettingsPage() {
  const [active, setActive] = useState("school");
  const current = sections.find((s) => s.key === active)!;

  return (
    <AppShell
      title="Settings"
      subtitle="Manage system configurations."
      actions={
        <button className="h-9 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          Save Changes
        </button>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <Panel className="h-fit">
          <nav className="space-y-1">
            {sections.map((s) => (
              <button
                key={s.key}
                onClick={() => setActive(s.key)}
                className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm transition-colors ${
                  active === s.key ? "bg-primary text-primary-foreground" : "hover:bg-secondary"
                }`}
              >
                <s.icon className="size-4" /> {s.label}
              </button>
            ))}
          </nav>
        </Panel>

        <Panel title={current.label}>
          {active === "school" ? (
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="School Name">
                <input defaultValue={school.name} className={inputClass} />
              </Field>
              <Field label="Email Address">
                <input defaultValue={school.email} className={inputClass} />
              </Field>
              <Field label="Phone Number">
                <input defaultValue={school.phone} className={inputClass} />
              </Field>
              <Field label="Address">
                <input defaultValue={school.address} className={inputClass} />
              </Field>
              <div className="sm:col-span-2">
                <p className="mb-1.5 text-sm font-medium text-muted-foreground">School Logo</p>
                <button className="flex h-28 w-full flex-col items-center justify-center gap-2 rounded-md border border-dashed border-border text-sm text-muted-foreground hover:border-primary hover:text-primary">
                  <Camera className="size-5" />
                  Click to upload logo
                  <span className="text-xs">Recommended size 200×200px</span>
                </button>
              </div>
            </div>
          ) : active === "scores" ? (
            <div className="grid gap-4 sm:grid-cols-3">
              <Field label="Test 1 weight">
                <input type="number" defaultValue={20} className={inputClass} />
              </Field>
              <Field label="Test 2 weight">
                <input type="number" defaultValue={20} className={inputClass} />
              </Field>
              <Field label="Exam weight">
                <input type="number" defaultValue={60} className={inputClass} />
              </Field>
            </div>
          ) : active === "grading" ? (
            <ul className="divide-y divide-border text-sm">
              {[
                ["A", "90 – 100", "Excellent"],
                ["B", "75 – 89", "Very good"],
                ["C", "60 – 74", "Good"],
                ["D", "50 – 59", "Pass"],
                ["F", "0 – 49", "Fail"],
              ].map(([g, range, label]) => (
                <li key={g} className="flex items-center justify-between py-3">
                  <span className="font-semibold">{g}</span>
                  <span className="text-muted-foreground">{range}</span>
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">
              {current.label} options will appear here once configured.
            </p>
          )}
        </Panel>
      </div>
    </AppShell>
  );
}
