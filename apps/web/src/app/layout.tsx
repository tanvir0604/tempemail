import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import { GoogleAnalytics } from '@next/third-parties/google';
import NotificationPermission from '@/components/NotoficationPermission';
import Footer from '@/components/_templates/Footer';
import Logo from '@/components/_templates/Logo';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'TempEmail - Free Temporary Email | Disposable Email Address',
    description:
        'Get a free temporary email address instantly. Receive emails anonymously without registration. Features QR code sync, time extension, and safe email viewing with content warnings.',
    keywords: [
        'temporary email',
        'disposable email',
        'temp mail',
        'fake email',
        'throwaway email',
        'anonymous email',
        'burner email',
        'temporary email address',
        'disposable email address',
        'temp email generator',
        'email privacy',
        'spam protection',
        'email without registration',
        'instant email',
        'temporary inbox',
    ],
    authors: [{ name: 'tempemail' }],
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://www.temp-email.dev',
        title: 'TempEmail - Free Temporary Email | Disposable Email Address',
        description:
            'Create instant temporary email addresses. Receive emails safely with QR code sync, time extension, and content safety warnings. No registration required.',
        siteName: 'TempEmail',
        // images: [
        //   {
        //     url: "https://www.temp-email.dev/og-image.jpg",
        //     width: 1200,
        //     height: 630,
        //     alt: "Temporary Email Service",
        //   },
        // ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Free Temporary Email - Disposable Email Address',
        description:
            'Get instant temporary email addresses with QR sync and safe viewing. No registration needed.',
        // images: ["https://www.temp-email.dev/twitter-image.jpg"],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    alternates: {
        canonical: 'https://www.temp-email.dev',
    },
    verification: {
        // google: "your-google-verification-code",
        // yandex: "your-yandex-verification-code",
        // bing: "your-bing-verification-code"
    },
};

// Additional JSON-LD structured data (add this to your layout or page component)
export const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'TempEmail - Temporary Email Service',
    description:
        'Free temporary email service with instant disposable email addresses, QR code sync, and content safety features',
    url: 'https://www.temp-email.dev',
    applicationCategory: 'UtilityApplication',
    offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
    },
    featureList: [
        'Instant temporary email addresses',
        'QR code for multi-device access',
        'Extend email expiration time',
        'Create new email addresses instantly',
        'Formatted email display',
        'Content safety warnings for harmful/adult content',
    ],
    browserRequirements: 'Requires JavaScript. Works on modern browsers.',
    permissions: 'No registration required',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased h-full min-h-screen flex flex-col`}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <header className="py-6">
                        <Logo />
                    </header>
                    <main className="grow bg-zinc-950 text-zinc-100 p-4 md:p-8">
                        {children}
                    </main>

                    <Footer />
                    <Toaster />
                </ThemeProvider>
                <GoogleAnalytics gaId="G-C408WG5T3N" />
                <NotificationPermission />
            </body>
        </html>
    );
}
