import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '@/app/globals.css';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import { GoogleAnalytics } from '@next/third-parties/google';
import NotificationPermission from '@/components/NotoficationPermission';
import Footer from '@/components/_templates/Footer';
import Logo from '@/components/_templates/Logo';
import { getLocale, setRequestLocale } from 'next-intl/server';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

const baseUrl = process.env.BASE_URL ?? 'https://www.temp-email.dev';

export const metadata: Metadata = {
    title: 'Blog - Latest Updates & Guides | TempEmail',
    description:
        'Explore articles about temporary email services, privacy tips, and security guides. Learn how to protect your inbox from spam and maintain online anonymity.',
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    setRequestLocale('en');
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased h-full min-h-screen flex flex-col`}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange
                >
                    <header className="py-6">
                        <Logo />
                    </header>
                    <main className="grow bg-zinc-950 text-zinc-100 p-4 md:p-8">
                        {children}
                    </main>

                    <Footer showLanguageSwitcher={false} />
                    <Toaster />
                </ThemeProvider>
                {process.env.NODE_ENV == 'production' && (
                    <GoogleAnalytics gaId="G-C408WG5T3N" />
                )}
                <NotificationPermission />
            </body>
        </html>
    );
}
