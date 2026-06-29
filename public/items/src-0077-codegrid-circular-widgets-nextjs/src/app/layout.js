import "./globals.css";

export const metadata = {
  title: "Scroll-Powered Circular Widgets | Codegrid",
  description: "Scroll-Powered Circular Widgets | Codegrid",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
