"use client";

import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">

      <header className="border-b border-white/10">
        <div className="max-w-5xl mx-auto px-5 py-4 flex items-center justify-between">

          <div className="font-semibold text-lg">
            <Link href="/" className="hover:text-white">
              SupportPilot
            </Link>
          </div>

          <div className="flex items-center gap-6 text-sm text-gray-400">
            <Link href="#features" className="hover:text-white">
              Features
            </Link>
            <Link href="#how" className="hover:text-white">
              How
            </Link>
            <Link
              href="/login"
              className="px-4 py-2 bg-indigo-600 rounded-md hover:bg-indigo-500 text-white"
            >
              Login
            </Link>
          </div>

        </div>
      </header>

      <main className="flex-1 flex items-center">
        <div className="max-w-5xl mx-auto px-5 py-20 grid md:grid-cols-2 gap-10 items-center">

          <div>
            <h1 className="text-4xl font-semibold leading-tight">
              Simple ticket system for customer support
            </h1>

            <p className="text-gray-400 mt-4">
              Manage bugs, payments, login issues and customer requests in one place.
            </p>

            <div className="mt-6 flex gap-3">
              <Link
                href="/login"
                className="px-5 py-2.5 bg-indigo-600 rounded-md hover:bg-indigo-500"
              >
                Get Started
              </Link>

              <Link
                href="#features"
                className="px-5 py-2.5 border border-white/15 rounded-md hover:bg-white/5"
              >
                Learn More
              </Link>
            </div>
          </div>

          <div className="border border-white/10 bg-white/5 rounded-xl p-5 space-y-3">
            <div className="p-3 rounded bg-white/5">💳 Payment failed</div>
            <div className="p-3 rounded bg-white/5">🔐 Login issue</div>
            <div className="p-3 rounded bg-white/5">🐞 Bug report</div>
            <div className="p-3 rounded bg-white/5">💡 Feature request</div>
          </div>

        </div>
      </main>

      <section id="features" className="border-t border-white/10 py-16">
        <div className="max-w-5xl mx-auto px-5 grid md:grid-cols-3 gap-6">

          <div className="p-4 border border-white/10 rounded-lg bg-white/5">
            <h3 className="font-medium">Tickets</h3>
            <p className="text-gray-400 text-sm mt-2">
              Track issues from open to resolved.
            </p>
          </div>

          <div className="p-4 border border-white/10 rounded-lg bg-white/5">
            <h3 className="font-medium">Roles</h3>
            <p className="text-gray-400 text-sm mt-2">
              Admin, Agent, Customer access control.
            </p>
          </div>

          <div className="p-4 border border-white/10 rounded-lg bg-white/5">
            <h3 className="font-medium">Fast Support</h3>
            <p className="text-gray-400 text-sm mt-2">
              Assign and resolve quickly.
            </p>
          </div>

        </div>
      </section>

      <section id="how" className="border-t border-white/10 py-16">
        <div className="max-w-5xl mx-auto px-5 grid md:grid-cols-3 gap-6 text-center text-sm">

          <div>
            <div className="text-indigo-400 text-lg">1</div>
            <p className="mt-2 text-gray-300">Create ticket</p>
          </div>

          <div>
            <div className="text-indigo-400 text-lg">2</div>
            <p className="mt-2 text-gray-300">Agent handles</p>
          </div>

          <div>
            <div className="text-indigo-400 text-lg">3</div>
            <p className="mt-2 text-gray-300">Resolved</p>
          </div>

        </div>
      </section>

      <footer className="border-t border-white/10 py-6 text-center text-gray-500 text-sm">
        SupportPilot © {new Date().getFullYear()}
      </footer>

    </div>
  );
}