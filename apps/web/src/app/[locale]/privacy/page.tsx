import { LockIcon } from 'lucide-react';
import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

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
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: 'PrivacyPage' });

    const canonical = `${baseUrl}/${locale}/privacy`;

    const languages: Record<string, string> = {};
    locales.forEach((loc) => {
        languages[loc] = `${baseUrl}/${loc}/privacy`;
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
                    url: '/og-privacy.png',
                    width: 1200,
                    height: 630,
                    alt: 'TempEmail - Privacy Policy',
                },
            ],
            locale: t('Metadata.locale'),
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: t('Metadata.twitterTitle'),
            description: t('Metadata.twitterDescription'),
            images: ['/twitter-privacy.png'],
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
                'x-default': `${baseUrl}/en/privacy`,
            },
        },
    };
}

export default async function PrivacyPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations('PrivacyPage');
    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div className="text-center space-y-4">
                <div className="flex justify-center">
                    <div className="p-4 bg-zinc-800 rounded-2xl">
                        <LockIcon className="w-12 h-12 text-blue-500" />
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
                        {t('sections.introduction.heading')}
                    </h2>
                    <p className="text-zinc-300 leading-relaxed">
                        {t('sections.introduction.text')}
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-zinc-100">
                        {t('sections.dont_collect.heading')}
                    </h2>
                    <p className="text-zinc-300 leading-relaxed mb-4">
                        {t('sections.dont_collect.text')}
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-zinc-300 ml-4">
                        <li>{t('sections.dont_collect.items.name_email')}</li>
                        <li>{t('sections.dont_collect.items.credentials')}</li>
                        <li>{t('sections.dont_collect.items.payment_info')}</li>
                        <li>
                            {t('sections.dont_collect.items.persistent_ids')}
                        </li>
                        <li>
                            {t('sections.dont_collect.items.browsing_history')}
                        </li>
                    </ul>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-zinc-100">
                        {t('sections.temp_process.heading')}
                    </h2>
                    <p className="text-zinc-300 leading-relaxed mb-4">
                        {t('sections.temp_process.text')}
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-zinc-300 ml-4">
                        <li>
                            {t('sections.temp_process.items.generated_emails')}
                        </li>
                        <li>
                            {t('sections.temp_process.items.received_emails')}
                        </li>
                        <li>
                            {t('sections.temp_process.items.technical_data')}
                        </li>
                        <li>{t('sections.temp_process.items.analytics')}</li>
                    </ul>
                    <p className="text-zinc-300 leading-relaxed mt-4">
                        {t('sections.temp_process.note')}
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-zinc-100">
                        {t('sections.data_retention.heading')}
                    </h2>
                    <p className="text-zinc-300 leading-relaxed">
                        {t('sections.data_retention.text')}
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-zinc-100">
                        {t('sections.cookies_tracking.heading')}
                    </h2>
                    <p className="text-zinc-300 leading-relaxed">
                        {t('sections.cookies_tracking.text')}
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-zinc-100">
                        {t('sections.third_party.heading')}
                    </h2>
                    <p className="text-zinc-300 leading-relaxed">
                        {t('sections.third_party.text')}
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-zinc-100">
                        {t('sections.security.heading')}
                    </h2>
                    <p className="text-zinc-300 leading-relaxed">
                        {t('sections.security.text')}
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-zinc-100">
                        {t('sections.content_warnings.heading')}
                    </h2>
                    <p className="text-zinc-300 leading-relaxed">
                        {t('sections.content_warnings.text')}
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-zinc-100">
                        {t('sections.your_rights.heading')}
                    </h2>
                    <p className="text-zinc-300 leading-relaxed">
                        {t('sections.your_rights.text')}
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-zinc-100">
                        {t('sections.child_privacy.heading')}
                    </h2>
                    <p className="text-zinc-300 leading-relaxed">
                        {t('sections.child_privacy.text')}
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-zinc-100">
                        {t('sections.international_users.heading')}
                    </h2>
                    <p className="text-zinc-300 leading-relaxed">
                        {t('sections.international_users.text')}
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-zinc-100">
                        {t('sections.changes_policy.heading')}
                    </h2>
                    <p className="text-zinc-300 leading-relaxed">
                        {t('sections.changes_policy.text')}
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-zinc-100">
                        {t('sections.contact_us.heading')}
                    </h2>
                    <p className="text-zinc-300 leading-relaxed">
                        {t('sections.contact_us.text')}
                    </p>
                </section>
            </div>
        </div>
    );
}
