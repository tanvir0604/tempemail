import { Scale } from 'lucide-react';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { locales } from '@repo/validation';
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
    const t = await getTranslations({ locale, namespace: 'TermsPage' });

    const canonical = `${baseUrl}/${locale}/terms`;

    const languages: Record<string, string> = {};
    locales.forEach((loc) => {
        languages[loc] = `${baseUrl}/${loc}/terms`;
    });

    return {
        title: t('Metadata.title'),
        description: t('Metadata.description'),
        keywords: t('Metadata.keywords'),
        authors: [{ name: 'TempEmail' }],
        openGraph: {
            title: t('Metadata.ogTitle'),
            description: t('Metadata.ogDescription'),
            url: canonical,
            siteName: 'TempEmail',
            images: [
                {
                    url: '/og-terms.png',
                    width: 1200,
                    height: 630,
                    alt: 'TempEmail - Terms of Service',
                },
            ],
            locale: t('Metadata.locale'),
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: t('Metadata.twitterTitle'),
            description: t('Metadata.twitterDescription'),
            images: ['/twitter-terms.png'],
            creator: '@tempEmail',
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
            canonical,
            languages: {
                ...languages,
                'x-default': `${baseUrl}/en/terms`,
            },
        },
    };
}

export default async function TermsPage() {
    const t = await getTranslations('TermsPage');
    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div className="text-center space-y-4">
                <div className="flex justify-center">
                    <div className="p-4 bg-zinc-800 rounded-2xl">
                        <Scale className="w-12 h-12 text-blue-500" />
                    </div>
                </div>
                <h1 className="text-4xl font-bold text-zinc-100">
                    {t('title')}
                </h1>
                <p className="text-zinc-400">
                    {t('last_updated')}: {new Date().toLocaleDateString()}
                </p>
            </div>

            <div className="prose prose-invert max-w-none space-y-8">
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-zinc-100">
                        {t('sections.acceptance.heading')}
                    </h2>
                    <p className="text-zinc-300 leading-relaxed">
                        {t('sections.acceptance.text')}
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-zinc-100">
                        {t('sections.service_description.heading')}
                    </h2>
                    <p className="text-zinc-300 leading-relaxed">
                        {t('sections.service_description.text')}
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-zinc-100">
                        {t('sections.acceptable_use.heading')}
                    </h2>
                    <p className="text-zinc-300 leading-relaxed mb-4">
                        {t('sections.acceptable_use.text')}
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-zinc-300 ml-4">
                        <li>
                            {t(
                                'sections.acceptable_use.items.illegal_activities',
                            )}
                        </li>
                        <li>{t('sections.acceptable_use.items.harassment')}</li>
                        <li>
                            {t('sections.acceptable_use.items.spam_malware')}
                        </li>
                        <li>
                            {t(
                                'sections.acceptable_use.items.intellectual_property',
                            )}
                        </li>
                        <li>
                            {t(
                                'sections.acceptable_use.items.unauthorized_access',
                            )}
                        </li>
                        <li>
                            {t('sections.acceptable_use.items.commercial_use')}
                        </li>
                    </ul>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-zinc-100">
                        {t('sections.privacy_data.heading')}
                    </h2>
                    <p className="text-zinc-300 leading-relaxed">
                        {t('sections.privacy_data.text')}
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-zinc-100">
                        {t('sections.no_warranty.heading')}
                    </h2>
                    <p className="text-zinc-300 leading-relaxed">
                        {t('sections.no_warranty.text')}
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-zinc-100">
                        {t('sections.limitation_liability.heading')}
                    </h2>
                    <p className="text-zinc-300 leading-relaxed">
                        {t('sections.limitation_liability.text')}
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-zinc-100">
                        {t('sections.changes_terms.heading')}
                    </h2>
                    <p className="text-zinc-300 leading-relaxed">
                        {t('sections.changes_terms.text')}
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-zinc-100">
                        {t('sections.contact.heading')}
                    </h2>
                    <p className="text-zinc-300 leading-relaxed">
                        {t('sections.contact.text')}
                    </p>
                </section>
            </div>
        </div>
    );
}
