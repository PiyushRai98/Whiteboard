"use client";

import { motion } from "framer-motion";

import { ScenePreview } from "@/components/scene-preview";
import { useWorkspaceStore } from "@/lib/use-workspace-store";

const cameraModes = [
  { id: "orbit", label: "Orbit" },
  { id: "fly", label: "Fly" },
  { id: "presentation", label: "Present" },
] as const;

const pillars = [
  "Infinite canvas with layered boards",
  "Realtime cursor and presence foundations",
  "3D scene workspace with camera modes",
  "AI diagram and scene generation entry points",
  "JWT-backed room creation and guest access",
  "Docker-first local infrastructure",
];

export function WorkspaceShell() {
  const { cameraMode, collaborators, setCameraMode } = useWorkspaceStore();

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6 px-4 py-6 text-white md:px-8">
      <motion.section
        className="glass-panel rounded-[32px] p-6 md:p-8"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="mb-3 inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-cyan-200">
              Real-Time 3D Collaborative Whiteboard
            </div>
            <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
              A multiplayer workspace foundation for diagrams, scenes, and live collaboration.
            </h1>
            <p className="mt-4 max-w-2xl text-sm text-slate-300 md:text-base">
              This starter slice establishes the monorepo, realtime API, 3D frontend shell, typed
              contracts, and local infrastructure needed to grow into the full SaaS platform vision.
            </p>
          </div>

          <div className="glass-panel flex w-full max-w-sm items-center gap-3 rounded-2xl px-4 py-3">
            <span className="text-xs uppercase tracking-[0.25em] text-slate-400">Command</span>
            <input
              aria-label="Command palette"
              className="w-full bg-transparent text-sm outline-none placeholder:text-slate-500"
              defaultValue="Generate microservices architecture for ecommerce platform"
            />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <div className="space-y-6">
            <ScenePreview />
            <div className="grid gap-4 md:grid-cols-3">
              {cameraModes.map((mode) => {
                const active = cameraMode === mode.id;

                return (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => setCameraMode(mode.id)}
                    className={`glass-panel rounded-2xl px-4 py-4 text-left transition ${
                      active ? "border-cyan-300/40 bg-cyan-300/10" : ""
                    }`}
                  >
                    <div className="text-xs uppercase tracking-[0.25em] text-slate-400">
                      Camera
                    </div>
                    <div className="mt-2 text-lg font-medium">{mode.label}</div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-4">
            <div className="glass-panel rounded-3xl p-5">
              <div className="text-sm font-semibold text-slate-200">Live Presence</div>
              <div className="mt-4 space-y-3">
                {collaborators.map((collaborator) => (
                  <div key={collaborator.id} className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: collaborator.color }}
                      />
                      <div>
                        <div className="font-medium">{collaborator.name}</div>
                        <div className="text-sm text-slate-400">{collaborator.activity}</div>
                      </div>
                    </div>
                    <span className="rounded-full bg-emerald-400/10 px-2 py-1 text-xs text-emerald-300">
                      Live
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-panel rounded-3xl p-5">
              <div className="text-sm font-semibold text-slate-200">Roadmap Pillars</div>
              <ul className="mt-4 space-y-3 text-sm text-slate-300">
                {pillars.map((pillar) => (
                  <li key={pillar} className="flex gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-cyan-300" />
                    <span>{pillar}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.section>

      <section className="grid gap-4 lg:grid-cols-3">
        {[
          {
            title: "Floating tools",
            body: "Sticky notes, diagrams, connectors, embeds, and AI-assisted creation tools are designed as dockable surface modules.",
          },
          {
            title: "Realtime backend",
            body: "The API exposes rate-limited room and guest-auth endpoints and a Socket.IO collaboration channel for presence, cursor, and selection events.",
          },
          {
            title: "Persistence path",
            body: "A Prisma schema and Dockerized Postgres/Redis stack provide the baseline for snapshots, assets, roles, and board history.",
          },
        ].map((card) => (
          <motion.article
            key={card.title}
            className="glass-panel rounded-3xl p-5"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-lg font-semibold">{card.title}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">{card.body}</p>
          </motion.article>
        ))}
      </section>
    </main>
  );
}
