import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Claude Transcript Viewer",
  description: "View your Claude conversation transcripts in a beautiful interface",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="[scrollbar-gutter:stable]">
      <body className={`${jetbrainsMono.variable} antialiased text-text bg-base font-mono`}>
        {children}
      </body>
    </html>
  );
}
