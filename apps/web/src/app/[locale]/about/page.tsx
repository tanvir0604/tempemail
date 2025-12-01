import {
    Clock,
    Eye,
    FileText,
    LockIcon,
    Mail,
    QrCode,
    Shield,
    UserCheck,
    Users,
} from 'lucide-react';
import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { locales } from '@repo/validation';
export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
    title: 'About Us - TempEmail | Free Temporary Email Service',
    description:
        "Learn about TempEmail's mission to protect your privacy with free temporary email addresses. Instant generation, no registration, and complete anonymity.",
    keywords: [
        'about tempemail',
        'temporary email service',
        'disposable email about',
        'email privacy service',
        'anonymous email service',
        'free temp mail',
        'email protection',
    ],
    authors: [{ name: 'TempEmail' }],
    openGraph: {
        title: 'About TempEmail - Protecting Your Privacy',
        description:
            'Discover how TempEmail provides instant, secure temporary email addresses to protect your online privacy. No registration required.',
        url: 'https://temp-email.dev/about',
        siteName: 'TempEmail',
        images: [
            {
                url: '/og-about.png',
                width: 1200,
                height: 630,
                alt: 'TempEmail - About Us',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'About TempEmail - Free Temporary Email Service',
        description:
            'Learn how TempEmail protects your privacy with instant temporary email addresses. No registration, completely free.',
        images: ['/twitter-about.png'],
        creator: '@tempemail',
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
        canonical: 'https://temp-email.dev/about',
    },
};

export default async function AboutPage() {
    const t = await getTranslations('AboutPage');
    return (
        <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center space-y-4">
                <div className="flex justify-center">
                    <div className="p-4 bg-zinc-800 rounded-2xl">
                        <Mail className="w-12 h-12 text-blue-500" />
                    </div>
                </div>
                <h1 className="text-4xl font-bold text-zinc-100">
                    {t('title')}
                </h1>
                <p className="text-xl text-zinc-400">{t('subtitle')}</p>
            </div>

            <div className="prose prose-invert max-w-none">
                <section className="space-y-4">
                    <div className="flex items-center gap-3 mb-6">
                        <Users className="w-6 h-6 text-blue-500" />
                        <h2 className="text-2xl font-semibold text-zinc-100 m-0">
                            {t('our_mission.heading')}
                        </h2>
                    </div>
                    <p className="text-zinc-300 leading-relaxed">
                        {t('our_mission.text')}
                    </p>
                </section>

                <section className="space-y-4 pt-8">
                    <div className="flex items-center gap-3 mb-6">
                        <Shield className="w-6 h-6 text-blue-500" />
                        <h2 className="text-2xl font-semibold text-zinc-100 m-0">
                            {t('what_we_do.heading')}
                        </h2>
                    </div>
                    <p className="text-zinc-300 leading-relaxed">
                        {t('what_we_do.text')}
                    </p>
                </section>

                <section className="space-y-6 pt-8">
                    <div className="flex items-center gap-3 mb-6">
                        <FileText className="w-6 h-6 text-blue-500" />
                        <h2 className="text-2xl font-semibold text-zinc-100 m-0">
                            {t('key_features.heading')}
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-zinc-800 p-6 rounded-xl border border-zinc-700">
                            <Clock className="w-8 h-8 text-blue-500 mb-3" />
                            <h3 className="text-lg font-semibold text-zinc-100 mb-2">
                                {t(
                                    'key_features.features.instant_generation.title',
                                )}
                            </h3>
                            <p className="text-zinc-400 text-sm">
                                {t(
                                    'key_features.features.instant_generation.text',
                                )}
                            </p>
                        </div>

                        <div className="bg-zinc-800 p-6 rounded-xl border border-zinc-700">
                            <Eye className="w-8 h-8 text-blue-500 mb-3" />
                            <h3 className="text-lg font-semibold text-zinc-100 mb-2">
                                {t(
                                    'key_features.features.content_safety.title',
                                )}
                            </h3>
                            <p className="text-zinc-400 text-sm">
                                {t('key_features.features.content_safety.text')}
                            </p>
                        </div>

                        <div className="bg-zinc-800 p-6 rounded-xl border border-zinc-700">
                            <QrCode className="w-8 h-8 text-blue-500 mb-3" />
                            <h3 className="text-lg font-semibold text-zinc-100 mb-2">
                                {t('key_features.features.qr_code_sync.title')}
                            </h3>
                            <p className="text-zinc-400 text-sm">
                                {t('key_features.features.qr_code_sync.text')}
                            </p>
                        </div>

                        <div className="bg-zinc-800 p-6 rounded-xl border border-zinc-700">
                            <LockIcon className="w-8 h-8 text-blue-500 mb-3" />
                            <h3 className="text-lg font-semibold text-zinc-100 mb-2">
                                {t('key_features.features.privacy_first.title')}
                            </h3>
                            <p className="text-zinc-400 text-sm">
                                {t('key_features.features.privacy_first.text')}
                            </p>
                        </div>
                    </div>
                </section>

                <section className="space-y-4 pt-8">
                    <div className="flex items-center gap-3 mb-6">
                        <UserCheck className="w-6 h-6 text-blue-500" />
                        <h2 className="text-2xl font-semibold text-zinc-100 m-0">
                            {t('our_commitment.heading')}
                        </h2>
                    </div>
                    <p className="text-zinc-300 leading-relaxed">
                        {t('our_commitment.text')}
                    </p>
                </section>
            </div>
        </div>
    );
}
