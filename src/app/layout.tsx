import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "XML Prompt Editor - Professional XML Template Editor",
  description: "Create, edit, and manage XML prompts with our intuitive editor. Perfect for AI developers and content creators.",
  keywords: ["XML", "prompt", "editor", "template", "AI"],
  authors: [{ name: "XML Prompt Editor Team" }],
  openGraph: {
    title: "XML Prompt Editor",
    description: "Professional XML template editor for AI prompts",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
