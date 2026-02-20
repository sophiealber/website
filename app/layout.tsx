import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sophie Alber — Software Engineer",
  description:
    "Software Engineer at Datadog. Cornell CS '25, Magna Cum Laude. Based in Boston, MA.",
  metadataBase: new URL("https://sophie-alber.vercel.app"),
  openGraph: {
    title: "Sophie Alber",
    description:
      "Software Engineer at Datadog. Cornell CS '25, Magna Cum Laude.",
    url: "https://sophie-alber.vercel.app",
    siteName: "Sophie Alber",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sophie Alber — Software Engineer at Datadog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sophie Alber — Software Engineer",
    description:
      "Software Engineer at Datadog. Cornell CS '25, Magna Cum Laude.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
