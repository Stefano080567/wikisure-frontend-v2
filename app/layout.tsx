import '../styles/globals.css';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'WikiSure',
  description: 'WikiSure GPT Dev Agent',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
