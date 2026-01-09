import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { Providers } from "./providers";
import FloatingChat from "@/components/chat/FloatingChat";
import { HeartProgress } from "@/components/ui/HeartProgress";
import { LessonSidebar } from "@/components/layout/LessonSidebar";

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Para Milita - Aprendiendo Frontend",
  description: "Aprende a crear cosas hermosas en la web paso a paso.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={poppins.className}>
        <Providers>
          <header className="topNav">
            <div className="topNav__inner">
              <div className="topNav__logo">
                <Link href="/">Milita</Link>
              </div>
              <nav className="topNav__links">
                <Link href="/">Inicio</Link>
                <Link href="/playground" className="topNav__cta">
                  Playground
                </Link>
              </nav>
            </div>
          </header>
          <LessonSidebar />
          {children}
          <HeartProgress />
          <FloatingChat />
        </Providers>
      </body>
    </html>
  );
}
