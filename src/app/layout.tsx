import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "design maxxing — 436 web dev projects",
    template: "%s | design maxxing",
  },
  description:
    "Browse 436 web dev projects, animations, and templates. Every project viewable in its full glory.",
  openGraph: {
    title: "design maxxing — 436 web dev projects",
    description:
      "Browse 436 web dev projects, animations, and templates. Every project viewable in its full glory.",
    siteName: "design maxxing",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "design maxxing — 436 web dev projects",
    description:
      "Browse 436 web dev projects, animations, and templates. Every project viewable in its full glory.",
  },
  themeColor: "#080808",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#080808] text-white antialiased">
        <div className="min-h-screen flex flex-col">
          <div className="flex-1">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
