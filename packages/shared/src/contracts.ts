import { z } from "zod";

export const roomRoleSchema = z.enum(["owner", "editor", "viewer", "presenter"]);

export const collaboratorSchema = z.object({
  id: z.string(),
  name: z.string().min(2).max(48),
  color: z.string().regex(/^#/),
  activity: z.string().min(2).max(80),
});

export const roomSchema = z.object({
  id: z.string(),
  name: z.string().min(3).max(80),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  role: roomRoleSchema,
});

export const boardSnapshotSchema = z.object({
  id: z.string(),
  roomId: z.string(),
  versionName: z.string().min(2).max(80),
  objects: z.array(z.record(z.unknown())),
});

export const aiGenerationRequestSchema = z.object({
  prompt: z.string().min(12).max(500),
  mode: z.enum(["diagram", "flowchart", "mind-map", "scene-3d"]),
});

export type RoomRole = z.infer<typeof roomRoleSchema>;
export type Collaborator = z.infer<typeof collaboratorSchema>;
export type Room = z.infer<typeof roomSchema>;
export type BoardSnapshot = z.infer<typeof boardSnapshotSchema>;
export type AiGenerationRequest = z.infer<typeof aiGenerationRequestSchema>;
