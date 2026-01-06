import type { Metadata } from "next";
import { Poppins } from "next/font/google";
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
          <LessonSidebar />
          {children}
          <HeartProgress />
          <FloatingChat />
        </Providers>
      </body>
    </html>
  );
}
