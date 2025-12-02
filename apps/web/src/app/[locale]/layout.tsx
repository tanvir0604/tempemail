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
import { getMessages, getTranslations } from 'next-intl/server';
import { locales } from '@repo/validation';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

const baseUrl = process.env.BASE_URL ?? 'https://www.temp-email.dev';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Metadata' });

    // Generate language alternates
    const languages: Record<string, string> = {};
    locales.forEach((loc) => {
        languages[loc] = `${baseUrl}/${loc}`;
    });

    const canonical = `${baseUrl}/${locale}`;

    return {
        title: t('title'),
        description: t('description'),
        keywords: t('keywords')
            .split(',')
            .map((k) => k.trim()),
        alternates: {
            canonical,
            languages: {
                ...languages,
                'x-default': `${baseUrl}/en`,
            },
        },
        authors: [{ name: 'tempemail' }],
        openGraph: {
            type: 'website',
            locale: locale === 'en' ? 'en_US' : locale.replace('-', '_'),
            alternateLocale: locales
                .filter((loc) => loc !== locale)
                .map((loc) => (loc === 'en' ? 'en_US' : loc.replace('-', '_'))),
            url: `${baseUrl}/${locale}`,
            title: t('og.title'),
            description: t('og.description'),
            siteName: 'TempEmail',
            // images: [
            //   {
            //     url: `${baseUrl}/og-image.jpg`,
            //     width: 1200,
            //     height: 630,
            //     alt: t('og.imageAlt'),
            //   },
            // ],
        },
        twitter: {
            card: 'summary_large_image',
            title: t('twitter.title'),
            description: t('twitter.description'),
            // images: [`${baseUrl}/twitter-image.jpg`],
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
        verification: {
            // google: "your-google-verification-code",
            // yandex: "your-yandex-verification-code",
            // bing: "your-bing-verification-code"
        },
    };
}

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
    return (
        <html
            lang="en"
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
