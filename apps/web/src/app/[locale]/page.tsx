import EmailContainer from '@/components/EmailContainer';
import GenerateTempEmailButton from '@/components/GenerateTemporaryEmailButton';
import { Skeleton } from '@/components/ui/skeleton';
import { Check, Clock, Eye, Globe, QrCode, Shield, Zap } from 'lucide-react';
import { Suspense } from 'react';
import { getTranslations } from 'next-intl/server';

export default async function HomePage() {
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

            <section className="py-8 md:py-16 md:px-4 md:bg-zinc-900 blockquote">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold mb-6 text-center">
                        {t('temporary_email.title')}
                    </h2>
                    <div className="prose prose-invert max-w-none">
                        <p className="text-zinc-300 text-lg leading-relaxed mb-4">
                            {t('temporary_email.description1')}
                        </p>
                        <p className="text-zinc-300 text-lg leading-relaxed">
                            {t('temporary_email.description2')}
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-8 md:py-16">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold mb-12 text-center">
                        {t('why_choose.title')}
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-colors">
                            <div className="bg-blue-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                                <Zap className="w-6 h-6 text-blue-500" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">
                                {t('why_choose.features.instant.title')}
                            </h3>
                            <p className="text-zinc-400">
                                {t('why_choose.features.instant.description')}
                            </p>
                        </div>

                        <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-colors">
                            <div className="bg-blue-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                                <Shield className="w-6 h-6 text-blue-500" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">
                                {t('why_choose.features.privacy.title')}
                            </h3>
                            <p className="text-zinc-400">
                                {t('why_choose.features.privacy.description')}
                            </p>
                        </div>

                        <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-colors">
                            <div className="bg-blue-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                                <Clock className="w-6 h-6 text-blue-500" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">
                                {t('why_choose.features.time.title')}
                            </h3>
                            <p className="text-zinc-400">
                                {t('why_choose.features.time.description')}
                            </p>
                        </div>

                        <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-colors">
                            <div className="bg-blue-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                                <QrCode className="w-6 h-6 text-blue-500" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">
                                {t('why_choose.features.qr.title')}
                            </h3>
                            <p className="text-zinc-400">
                                {t('why_choose.features.qr.description')}
                            </p>
                        </div>

                        <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-colors">
                            <div className="bg-blue-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                                <Eye className="w-6 h-6 text-blue-500" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">
                                {t('why_choose.features.safe.title')}
                            </h3>
                            <p className="text-zinc-400">
                                {t('why_choose.features.safe.description')}
                            </p>
                        </div>

                        <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-colors">
                            <div className="bg-blue-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                                <Globe className="w-6 h-6 text-blue-500" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">
                                {t('why_choose.features.free.title')}
                            </h3>
                            <p className="text-zinc-400">
                                {t('why_choose.features.free.description')}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-8 md:py-16 md:px-4 md:bg-zinc-900">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold mb-8 text-center">
                        {t('when_to_use.title')}
                    </h2>

                    <div className="space-y-4">
                        <div className="flex gap-4 bg-zinc-950/20 p-5 rounded-lg border border-zinc-800">
                            <Check className="w-6 h-6 text-blue-500 shrink-0 mt-1" />
                            <div>
                                <h3 className="font-semibold text-lg mb-2">
                                    {t('when_to_use.items.online.title')}
                                </h3>
                                <p className="text-zinc-400">
                                    {t('when_to_use.items.online.description')}
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4 bg-zinc-950/20 p-5 rounded-lg border border-zinc-800">
                            <Check className="w-6 h-6 text-blue-500 shrink-0 mt-1" />
                            <div>
                                <h3 className="font-semibold text-lg mb-2">
                                    {t('when_to_use.items.trials.title')}
                                </h3>
                                <p className="text-zinc-400">
                                    {t('when_to_use.items.trials.description')}
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4 bg-zinc-950/20 p-5 rounded-lg border border-zinc-800">
                            <Check className="w-6 h-6 text-blue-500 shrink-0 mt-1" />
                            <div>
                                <h3 className="font-semibold text-lg mb-2">
                                    {t('when_to_use.items.testing.title')}
                                </h3>
                                <p className="text-zinc-400">
                                    {t('when_to_use.items.testing.description')}
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4 bg-zinc-950/20 p-5 rounded-lg border border-zinc-800">
                            <Check className="w-6 h-6 text-blue-500 shrink-0 mt-1" />
                            <div>
                                <h3 className="font-semibold text-lg mb-2">
                                    {t('when_to_use.items.spam.title')}
                                </h3>
                                <p className="text-zinc-400">
                                    {t('when_to_use.items.spam.description')}
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4 bg-zinc-950/20 p-5 rounded-lg border border-zinc-800">
                            <Check className="w-6 h-6 text-blue-500 shrink-0 mt-1" />
                            <div>
                                <h3 className="font-semibold text-lg mb-2">
                                    {t('when_to_use.items.privacy.title')}
                                </h3>
                                <p className="text-zinc-400">
                                    {t('when_to_use.items.privacy.description')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-8 md:py-16 md:px-4">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold mb-12 text-center">
                        {t('how_it_works.title')}
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="bg-blue-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-blue-500">
                                <span className="text-2xl font-bold text-blue-500">
                                    1
                                </span>
                            </div>
                            <h3 className="text-xl font-semibold mb-3">
                                {t('how_it_works.steps.1.title')}
                            </h3>
                            <p className="text-zinc-400">
                                {t('how_it_works.steps.1.description')}
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="bg-blue-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-blue-500">
                                <span className="text-2xl font-bold text-blue-500">
                                    2
                                </span>
                            </div>
                            <h3 className="text-xl font-semibold mb-3">
                                {t('how_it_works.steps.2.title')}
                            </h3>
                            <p className="text-zinc-400">
                                {t('how_it_works.steps.2.description')}
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="bg-blue-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-blue-500">
                                <span className="text-2xl font-bold text-blue-500">
                                    3
                                </span>
                            </div>
                            <h3 className="text-xl font-semibold mb-3">
                                {t('how_it_works.steps.3.title')}
                            </h3>
                            <p className="text-zinc-400">
                                {t('how_it_works.steps.3.description')}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-8 md:py-16 md:px-4 md:bg-zinc-900">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold mb-8 text-center">
                        {t('faq.title')}
                    </h2>

                    <div className="space-y-6">
                        <div className="bg-zinc-950/20 p-6 rounded-xl border border-zinc-800">
                            <h3 className="text-lg font-semibold mb-3">
                                {t('faq.items.free.question')}
                            </h3>
                            <p className="text-zinc-400">
                                {t('faq.items.free.answer')}
                            </p>
                        </div>

                        <div className="bg-zinc-950/20 p-6 rounded-xl border border-zinc-800">
                            <h3 className="text-lg font-semibold mb-3">
                                {t('faq.items.duration.question')}
                            </h3>
                            <p className="text-zinc-400">
                                {t('faq.items.duration.answer')}
                            </p>
                        </div>

                        <div className="bg-zinc-950/20 p-6 rounded-xl border border-zinc-800">
                            <h3 className="text-lg font-semibold mb-3">
                                {t('faq.items.send.question')}
                            </h3>
                            <p className="text-zinc-400">
                                {t('faq.items.send.answer')}
                            </p>
                        </div>

                        <div className="bg-zinc-950/20 p-6 rounded-xl border border-zinc-800">
                            <h3 className="text-lg font-semibold mb-3">
                                {t('faq.items.important.question')}
                            </h3>
                            <p className="text-zinc-400">
                                {t('faq.items.important.answer')}
                            </p>
                        </div>

                        <div className="bg-zinc-950/20 p-6 rounded-xl border border-zinc-800">
                            <h3 className="text-lg font-semibold mb-3">
                                {t('faq.items.store.question')}
                            </h3>
                            <p className="text-zinc-400">
                                {t('faq.items.store.answer')}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-8 md:py-20 md:px-4 text-center">
                <div className="max-w-3xl mx-auto space-y-6">
                    <h2 className="text-4xl font-bold">{t('cta.title')}</h2>
                    <p className="text-xl text-zinc-400">
                        {t('cta.description')}
                    </p>
                    <GenerateTempEmailButton />
                </div>
            </section>

            <section className="py-6 md:py-12 px-4 border-t border-zinc-800">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-3xl font-bold text-blue-500 mb-2">
                                100%
                            </div>
                            <div className="text-zinc-400">
                                {t('stats.free')}
                            </div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-blue-500 mb-2">
                                0
                            </div>
                            <div className="text-zinc-400">
                                {t('stats.registration')}
                            </div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-blue-500 mb-2">
                                ∞
                            </div>
                            <div className="text-zinc-400">
                                {t('stats.unlimited')}
                            </div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-blue-500 mb-2">
                                24/7
                            </div>
                            <div className="text-zinc-400">
                                {t('stats.available')}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
