import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Whiteboard | Real-Time 3D Collaboration",
  description: "Collaborative whiteboard foundation with realtime, 3D, and multiplayer architecture.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
