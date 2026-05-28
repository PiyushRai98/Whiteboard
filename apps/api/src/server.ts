import { createServer } from "node:http";

import { Server } from "socket.io";

import { createApp } from "./app.js";

const port = Number(process.env.API_PORT ?? 4000);
const app = createApp();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  socket.on("room:join", ({ roomId, user }) => {
    socket.join(roomId);
    socket.to(roomId).emit("presence:joined", {
      socketId: socket.id,
      user,
    });
  });

  socket.on("cursor:update", ({ roomId, cursor }) => {
    socket.to(roomId).emit("cursor:update", {
      socketId: socket.id,
      cursor,
    });
  });

  socket.on("selection:update", ({ roomId, selection }) => {
    socket.to(roomId).emit("selection:update", {
      socketId: socket.id,
      selection,
    });
  });
});

httpServer.listen(port, () => {
  console.log(`whiteboard api listening on :${port}`);
});
