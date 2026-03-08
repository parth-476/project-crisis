import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CrisisBrain - Disaster Response Management',
  description: 'Real-time crisis management and disaster response coordination platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
