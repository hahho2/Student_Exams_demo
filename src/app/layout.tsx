import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '../contexts/ThemeContext';
import { AuthProvider } from '../contexts/AuthContext';
import { ExamProvider } from '../contexts/ExamContext';

export const metadata: Metadata = {
  title: 'ExamCore — Online Physics Examination Platform',
  description: 'Distraction-free, secure, and professional online physics assessment portal for secondary and senior secondary students.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full antialiased">
        <ThemeProvider>
          <AuthProvider>
            <ExamProvider>
              {children}
            </ExamProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
