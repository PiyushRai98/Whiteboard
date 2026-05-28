import { describe, expect, it } from "vitest";

import {
  aiGenerationRequestSchema,
  collaboratorSchema,
  roomSchema,
} from "../src/contracts.js";

describe("shared contracts", () => {
  it("accepts valid room payloads", () => {
    const parsed = roomSchema.parse({
      id: "room-1",
      name: "Realtime Sandbox",
      slug: "realtime-sandbox",
      role: "owner",
    });

    expect(parsed.slug).toBe("realtime-sandbox");
  });

  it("rejects collaborator colors without hash prefix", () => {
    const result = collaboratorSchema.safeParse({
      id: "user-1",
      name: "Ava",
      color: "38bdf8",
      activity: "Editing",
    });

    expect(result.success).toBe(false);
  });

  it("requires meaningful AI prompts", () => {
    const result = aiGenerationRequestSchema.safeParse({
      prompt: "short",
      mode: "diagram",
    });

    expect(result.success).toBe(false);
  });
});
