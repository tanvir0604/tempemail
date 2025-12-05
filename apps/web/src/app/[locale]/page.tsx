import EmailContainer from '@/components/EmailContainer';

import { Skeleton } from '@/components/ui/skeleton';

import { Suspense } from 'react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import HomeContent from '@/components/HomeContent';

import { locales } from '@repo/validation';
import { Metadata } from 'next';
export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}
const baseUrl = process.env.BASE_URL ?? 'https://www.temp-email.dev';
export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    setRequestLocale(locale);
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

export default async function HomePage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations('HomePage');
    return (
        <div className="max-w-6xl mx-auto space-y-6">
            <section className="text-center space-y-2 mb-8">
                <h1 className="text-4xl font-bold text-zinc-50">
                    {t('title')}
                </h1>
                <p className="text-zinc-400">{t('sub_title')}</p>
            </section>

            <section className="py-8 md:py-16 space-y-6">
                <Suspense
                    fallback={
                        <div>
                            <Skeleton className="h-22 w-full" />
                            <Skeleton className="h-22 w-full" />
                            <Skeleton className="h-22 w-full" />
                            <Skeleton className="h-22 w-full" />
                            <Skeleton className="h-22 w-full" />
                        </div>
                    }
                >
                    <EmailContainer />
                </Suspense>
            </section>

            <Suspense
                fallback={
                    <div>
                        <Skeleton className="h-300 w-full" />
                    </div>
                }
            >
                <HomeContent />
            </Suspense>
        </div>
    );
}
