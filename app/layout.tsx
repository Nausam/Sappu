import type { Metadata } from "next";
import { Changa } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/Providers/ThemeProvider";

export const metadata: Metadata = {
  title: "Home | SAPPU",
  description:
    " SAPPU is a modern, fast and reliable web application for your business. It is built with Next.js, Tailwind CSS, and TypeScript.",
  icons: {
    icon: "/assets/images/logo.png",
  },
};

const changa = Changa({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "500"],
  variable: "--font-poppins",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={changa.variable}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
