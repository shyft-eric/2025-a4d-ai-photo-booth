import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "🎄 Vibe Coding Photo Booth",
  description: "Create holiday-themed app mockups in minutes!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-neutral-100 min-h-screen">
        {children}
      </body>
    </html>
  );
}
