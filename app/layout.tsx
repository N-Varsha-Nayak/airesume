import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./print.css";
import { ResumeProvider } from "@/app/contexts/ResumeContext";
import { BuildProvider } from "@/app/contexts/BuildContext";
import { TemplateProvider } from "@/app/contexts/TemplateContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Resume Builder",
  description: "Build a resume that gets read. Premium resume builder with live preview.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <BuildProvider>
          <TemplateProvider>
            <ResumeProvider>
              {children}
            </ResumeProvider>
          </TemplateProvider>
        </BuildProvider>
      </body>
    </html>
  );
}
