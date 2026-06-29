import "./globals.css";

export const metadata = {
  title: "AlaDesign Landing Page | Codegrid",
  description: "AlaDesign Landing Page | Codegrid",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
