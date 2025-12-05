import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '@/app/globals.css';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import { GoogleAnalytics } from '@next/third-parties/google';
import NotificationPermission from '@/components/NotoficationPermission';
import Footer from '@/components/_templates/Footer';
import Logo from '@/components/_templates/Logo';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { locales } from '@repo/validation';

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
};

const baseUrl = process.env.BASE_URL ?? 'https://www.temp-email.dev';

export async function generateJsonLd(locale: string) {
    const t = await getTranslations({ locale, namespace: 'Metadata' });

    return {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: t('jsonLd.name'),
        description: t('jsonLd.description'),
        url: `${baseUrl}/${locale}`,
        applicationCategory: 'UtilityApplication',
        inLanguage: locale,
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
        },
        featureList: t('jsonLd.features').split('|'),
        browserRequirements: t('jsonLd.browserRequirements'),
        permissions: t('jsonLd.permissions'),
    };
}

export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
    children,
    params,
}: Readonly<{
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}>) {
    const { locale } = await params;
    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }
    const messages = await getMessages({
        locale: locale,
    });
    const jsonLd = await generateJsonLd(locale);
    setRequestLocale(locale);
    return (
        <html
            lang={locale}
            suppressHydrationWarning
            dir={locale === 'ar' ? 'rtl' : 'ltr'}
        >
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </head>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased h-full min-h-screen flex flex-col`}
            >
                <NextIntlClientProvider messages={messages} locale={locale}>
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

                        <Footer />
                        <Toaster />
                    </ThemeProvider>
                    {process.env.NODE_ENV == 'production' && (
                        <GoogleAnalytics gaId="G-C408WG5T3N" />
                    )}
                    <NotificationPermission />
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
