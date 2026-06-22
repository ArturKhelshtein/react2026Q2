import type { Metadata } from 'next';
import './globals.css';
import ThemeProvider from '@/providers/ThemeProvider';

export const metadata: Metadata = {
  title: 'Pokemon App',
  description: 'Pokemon search app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body>
        <div id="root">
          <ThemeProvider>{children}</ThemeProvider>
        </div>
      </body>
    </html>
  );
}