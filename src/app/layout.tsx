import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const montserrat = Montserrat({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CureLink",
  description: "Your direct link to healthcare",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-zinc-900 text-white">
      <body className={montserrat.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
