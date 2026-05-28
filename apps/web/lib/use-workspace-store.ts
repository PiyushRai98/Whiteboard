"use client";

import { create } from "zustand";

type CameraMode = "orbit" | "fly" | "presentation";

type Collaborator = {
  id: string;
  name: string;
  activity: string;
  color: string;
};

type WorkspaceState = {
  cameraMode: CameraMode;
  collaborators: Collaborator[];
  setCameraMode: (cameraMode: CameraMode) => void;
};

const initialCollaborators: Collaborator[] = [
  { id: "1", name: "Ava", activity: "Editing canvas", color: "#38bdf8" },
  { id: "2", name: "Noah", activity: "Presenting scene", color: "#a855f7" },
  { id: "3", name: "Mia", activity: "Reviewing AI layout", color: "#22c55e" },
];

export const useWorkspaceStore = create<WorkspaceState>((set) => ({
  cameraMode: "orbit",
  collaborators: initialCollaborators,
  setCameraMode: (cameraMode) => set({ cameraMode }),
}));
