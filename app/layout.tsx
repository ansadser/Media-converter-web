import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MediaFlow — Fast Media Converter",
  description: "Smooth, modern video and audio conversion.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}