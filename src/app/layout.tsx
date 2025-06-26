import type { Metadata } from "next";
import { inter } from "@/lib/fonts";

import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Highbar Music",
  description: "Music Artist Recommendations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
