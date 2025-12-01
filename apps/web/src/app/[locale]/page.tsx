import EmailContainer from '@/components/EmailContainer';

import { Skeleton } from '@/components/ui/skeleton';

import { Suspense } from 'react';
import { getTranslations } from 'next-intl/server';
import HomeContent from '@/components/HomeContent';

import { locales } from '@repo/validation';
export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

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
