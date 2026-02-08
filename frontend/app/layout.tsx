import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const font = Inter({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Clinicare',
  description:
    'A simple clinical app for managing patients, appointments, and basic medical records.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.className} antialiased`}>{children}</body>
    </html>
  );
}
