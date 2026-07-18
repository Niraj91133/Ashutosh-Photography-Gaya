import '../index.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Asutosh Photography | Capturing Timeless Moments',
  description: 'Professional photography services specializing in Wedding, Pre-Wedding, Portrait, and Event coverage.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
