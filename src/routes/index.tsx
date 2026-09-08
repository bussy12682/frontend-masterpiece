import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Eye, EyeOff, GraduationCap } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EduTrack — Digital Academic Records Management" },
      {
        name: "description",
        content:
          "Sign in to EduTrack to manage students, classes, scores, attendance and academic reports in one place.",
      },
      { property: "og:title", content: "EduTrack — Digital Academic Records Management" },
      {
        property: "og:description",
        content: "Smarter records. Better decisions. Brighter futures.",
      },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden flex-col justify-between bg-navy px-12 py-14 text-navy-foreground lg:flex">
        <div className="flex items-center gap-2">
          <span className="grid size-9 place-items-center rounded-md bg-primary">
            <GraduationCap className="size-5 text-primary-foreground" />
          </span>
          <span className="font-display text-xl font-semibold">EduTrack</span>
        </div>
        <div>
          <h1 className="max-w-md font-display text-4xl font-semibold leading-tight">
            Digital Academic Records Management System
          </h1>
          <p className="mt-4 max-w-sm text-navy-foreground/70">
            Smarter records. Better decisions. Brighter futures.
          </p>
          <div className="mt-10 grid max-w-md grid-cols-3 gap-4">
            {[
              ["248", "Students"],
              ["18", "Teachers"],
              ["16", "Subjects"],
            ].map(([n, l]) => (
              <div key={l} className="rounded-lg bg-sidebar-accent px-4 py-3">
                <p className="font-display text-2xl font-semibold">{n}</p>
                <p className="text-xs text-navy-foreground/60">{l}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="text-xs text-navy-foreground/50">© 2026 EduTrack. All rights reserved.</p>
      </div>

      <div className="flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex items-center gap-2 lg:hidden">
            <span className="grid size-9 place-items-center rounded-md bg-primary">
              <GraduationCap className="size-5 text-primary-foreground" />
            </span>
            <span className="font-display text-xl font-semibold">EduTrack</span>
          </div>

          <h2 className="text-2xl font-semibold">Welcome back</h2>
          <p className="mt-1 text-sm text-muted-foreground">Sign in to your account</p>

          <form
            className="mt-8 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              navigate({ to: "/dashboard" });
            }}
          >
            <label className="block text-sm">
              <span className="mb-1.5 block font-medium">Email or Username</span>
              <input
                type="text"
                defaultValue="admin@brightfuture.edu.ng"
                className="h-10 w-full rounded-md border border-border bg-card px-3 text-sm outline-none focus:border-primary"
                placeholder="Enter your email or username"
              />
            </label>

            <label className="block text-sm">
              <span className="mb-1.5 block font-medium">Password</span>
              <div className="relative">
                <input
                  type={show ? "text" : "password"}
                  defaultValue="password"
                  className="h-10 w-full rounded-md border border-border bg-card px-3 pr-10 text-sm outline-none focus:border-primary"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShow((s) => !s)}
                  aria-label="Toggle password visibility"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                >
                  {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </label>

            <button
              type="submit"
              className="h-10 w-full rounded-md bg-primary text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Login
            </button>
          </form>

          <p className="mt-4 text-center text-sm">
            <a href="#" className="text-primary hover:underline">
              Forgot password?
            </a>
          </p>

          <div className="mt-8 rounded-md border border-border bg-secondary p-4 text-center text-sm text-muted-foreground">
            Signing in as a teacher?{" "}
            <Link to="/teacher" className="text-primary hover:underline">
              Open teacher dashboard
            </Link>
          </div>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            Don&apos;t have an account? Contact your school admin.
          </p>
        </div>
      </div>
    </div>
  );
}
