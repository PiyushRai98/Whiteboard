import request from "supertest";
import { describe, expect, it } from "vitest";

import { createApp, sanitizeSlug } from "../src/app.js";

describe("api foundation", () => {
  it("returns service health", async () => {
    const response = await request(createApp()).get("/health");

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("ok");
    expect(response.body.realtime.transport).toBe("socket.io");
  });

  it("creates a guest token for valid payloads", async () => {
    const response = await request(createApp())
      .post("/api/auth/guest")
      .send({ name: "Ava Designer" });

    expect(response.status).toBe(201);
    expect(response.body.token).toEqual(expect.any(String));
    expect(response.body.profile.color).toMatch(/^#/);
  });

  it("rejects invalid room payloads", async () => {
    const response = await request(createApp()).post("/api/rooms").send({ name: "A" });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Invalid room payload");
  });

  it("sanitizes room slugs consistently", () => {
    expect(sanitizeSlug(" Multiplayer Canvas ++ ")).toBe("multiplayer-canvas");
  });
});
