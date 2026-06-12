import type { Metadata } from "next";
import { Source_Code_Pro } from "next/font/google";
import "./globals.css";

const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Maxlias Dev Space",
  description: "A little showcase of some of my projects",
  authors: [{ name: "Maxlias" }],
  keywords: ["portfolio", "developer", "dev"],
  openGraph: {
    title: "Maxlias Dev Space",
    description: "A little showcase of some of my projects",
    type: "website",
    url: "https://maxlias.github.io/sei_devspace",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sourceCodePro.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
