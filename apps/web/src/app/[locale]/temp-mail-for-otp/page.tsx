import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { GoogleTagManager } from '@next/third-parties/google';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { locales } from '@repo/validation';
import { Metadata } from 'next';
import TempMailOTPContent from '@/components/TempMailOTPContent';

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
    const t = await getTranslations({
        locale,
        namespace: 'OTPContent.Metadata',
    });

    const languages: Record<string, string> = {};
    locales.forEach((loc) => {
        languages[loc] = `${baseUrl}/${loc}/temp-mail-for-otp`;
    });

    const canonical = `${baseUrl}/${locale}/temp-mail-for-otp`;

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
                'x-default': `${baseUrl}/en/temp-mail-for-otp`,
            },
        },
        authors: [{ name: 'tempemail' }],
        openGraph: {
            type: 'website',
            locale: locale === 'en' ? 'en_US' : locale.replace('-', '_'),
            alternateLocale: locales
                .filter((loc) => loc !== locale)
                .map((loc) => (loc === 'en' ? 'en_US' : loc.replace('-', '_'))),
            url: canonical,
            title: t('og.title'),
            description: t('og.description'),
            siteName: 'TempEmail',
        },
        twitter: {
            card: 'summary_large_image',
            title: t('twitter.title'),
            description: t('twitter.description'),
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
    };
}

export default async function TempMailOTPPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations('OTPContent');

    return (
        <>
            {process.env.NODE_ENV === 'production' && (
                <GoogleTagManager gtmId="GTM-MTW4N9KN" />
            )}

            <div className="max-w-6xl mx-auto space-y-6">
                {/* Page header — mirrors home page section pattern */}
                <section className="text-center space-y-2 mb-8">
                    <h1 className="text-4xl font-bold text-zinc-50">
                        {t('hero.title')}
                    </h1>
                    <p className="text-zinc-400">{t('hero.subtitle')}</p>
                </section>

                {/* Editorial content */}
                <section className="py-8 md:py-16">
                    <Suspense
                        fallback={
                            <div className="max-w-2xl mx-auto space-y-4">
                                <Skeleton className="h-8 w-56" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-5/6" />
                                <Skeleton className="h-4 w-4/6" />
                            </div>
                        }
                    >
                        <TempMailOTPContent />
                    </Suspense>
                </section>
            </div>
        </>
    );
}
