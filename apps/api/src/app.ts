import { randomUUID } from "node:crypto";

import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import jwt from "jsonwebtoken";
import { z } from "zod";

dotenv.config();

const colorPalette = [
  "#22c55e",
  "#38bdf8",
  "#f97316",
  "#e879f9",
  "#facc15",
  "#fb7185",
];

const guestAuthSchema = z.object({
  name: z.string().trim().min(2).max(48),
  avatarUrl: z.string().url().optional(),
});

const roomSchema = z.object({
  name: z.string().trim().min(3).max(80),
  slug: z
    .string()
    .trim()
    .min(3)
    .max(80)
    .regex(/^[a-z0-9-]+$/),
});

export function sanitizeSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function randomColor(seed: string) {
  const total = [...seed].reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return colorPalette[total % colorPalette.length];
}

export function createApp() {
  const app = express();

  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: "cross-origin" },
    }),
  );
  app.use(cors({ origin: true, credentials: true }));
  app.use(express.json({ limit: "1mb" }));
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      limit: 200,
      standardHeaders: true,
      legacyHeaders: false,
    }),
  );

  app.get("/health", (_req, res) => {
    res.json({
      status: "ok",
      services: {
        api: true,
        postgres: Boolean(process.env.DATABASE_URL),
        redis: Boolean(process.env.REDIS_URL),
      },
      realtime: {
        transport: "socket.io",
        sync: "websocket-provider-ready",
      },
    });
  });

  app.post("/api/auth/guest", (req, res) => {
    const result = guestAuthSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        error: "Invalid guest payload",
        issues: result.error.flatten(),
      });
    }

    const profile = {
      id: randomUUID(),
      name: result.data.name,
      avatarUrl: result.data.avatarUrl,
      color: randomColor(result.data.name),
      role: "editor",
    };

    const token = jwt.sign(profile, process.env.JWT_SECRET ?? "change-me", {
      expiresIn: "12h",
    });

    return res.status(201).json({ token, profile });
  });

  app.post("/api/rooms", (req, res) => {
    const slug = sanitizeSlug(req.body?.slug ?? req.body?.name ?? "");
    const result = roomSchema.safeParse({
      name: req.body?.name,
      slug,
    });

    if (!result.success) {
      return res.status(400).json({
        error: "Invalid room payload",
        issues: result.error.flatten(),
      });
    }

    return res.status(201).json({
      room: {
        id: randomUUID(),
        name: result.data.name,
        slug: result.data.slug,
        features: {
          canvas: true,
          realtime: true,
          presence: true,
          scene3d: true,
        },
      },
    });
  });

  return app;
}
