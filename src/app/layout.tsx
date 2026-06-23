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
        <ThemeProvider>
          <div id="root">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}