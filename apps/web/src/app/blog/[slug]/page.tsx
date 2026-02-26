import { getBlogDetails } from '@/lib/actions';
import { limitWords } from '@/lib/utils';
import { formatNumber, SimpleResponseType } from '@repo/validation';
import { NotebookIcon } from 'lucide-react';
import { notFound } from 'next/navigation';

import { DynamicIcon } from 'lucide-react/dynamic';
import Link from 'next/link';
import { getLocale, setRequestLocale } from 'next-intl/server';
import { Badge } from '@/components/ui/badge';

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
    const { slug } = await params;
    const blogData: SimpleResponseType = await getBlogDetails(slug);
    if (!blogData || !blogData.data) {
        return;
    }
    const title = 'TempEmail Blog - ' + blogData.data.title + ' | TempEmail';
    const description = limitWords(blogData.data.content, 50);
    return {
        title: title,
        description: description,

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

        publishedTime: blogData.data.publishedAt,
        modifiedTime: blogData.data.updatedAt,

        openGraph: {
            title: title,
            description: description,
            url: 'https://www.temp-email.dev/blog/' + slug,
            siteName: 'TempEmail',
            type: 'website',
            images: [
                {
                    url: blogData.data.image,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
            locale: 'en_US',
        },

        // Twitter Card
        twitter: {
            card: 'summary_large_image',
            title: title,
            description: description,
            images: [blogData.data.image],
            site: '@tempemail',
            creator: '@tempemail',
        },

        // alternates: {
        //     canonical: 'https://www.temp-email.dev/blog',
        //     types: {
        //         'application/rss+xml': [
        //             {
        //                 title: 'Tempemail Blog RSS Feed',
        //                 url: 'https://www.temp-email.dev/blog/rss.xml',
        //             },
        //         ],
        //     },
        // },

        // Additional meta for blog
        category: 'Technology Blog',
        classification: blogData.data.tag,

        // Robots and indexing
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

        // Additional structured data hints
        other: {
            'og:site_name': 'TempEmail',
            'theme-color': '#3B82F6',
            'msapplication-TileColor': '#3B82F6',
            'application-name': 'TempEmail Blog',
            'apple-mobile-web-app-title': 'TempEmail Blog',
            'format-detection': 'telephone=no',
        },

        // Verification and ownership
        verification: {
            // google: 'your-google-site-verification-code',
            // yandex: 'your-yandex-verification-code',
            // bing: 'your-bing-verification-code',
        },
    };
}

// export async function generateStaticParams() {
//     return [
//         { slug: '10-free-temporary-email-services-you-can-trust-in-2026' },
//         { slug: 'the-smart-way-to-stay-anonymous-online-using-temp-email-dev' },
//     ];
// }

export default async function BlogDetailsPage({ params }: Props) {
    const locale = await getLocale();
    setRequestLocale(locale);
    const { slug } = await params;
    const blogData: SimpleResponseType = await getBlogDetails(slug, true);

    if (!blogData || !blogData.data) {
        console.log('not found post');
        notFound();
    }
    const title = 'TempEmail Blog - ' + blogData.data.title + ' | TempEmail';
    const description = limitWords(blogData.data.content, 50);
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: title,
        description: description,
        url: 'https://www.temp-email.dev/blog/' + slug,
        image: {
            '@type': 'ImageObject',
            url: blogData.data.image,
            width: 1024,
            height: 1024,
            description: description,
        },
        author: {
            '@type': 'Organization',
            name: 'Tempemail Security Team',
        },
        datePublished: blogData.data.publishedAt,
        dateModified: blogData.data.updatedAt,
        articleSection: 'Online Safety',
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
        publisher: {
            '@type': 'Organization',
            name: 'Tempemail',
            url: 'https://www.temp-email.dev',
            logo: {
                '@type': 'ImageObject',
                url: 'https://www.temp-email.dev/images/logo.png',
            },
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://www.temp-email.dev/blog/' + slug,
        },
        inLanguage: 'en-US',
    };

    return (
        <div className="max-w-6xl mx-auto space-y-12">
            <section>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
                    }}
                />
            </section>
            <article title={blogData?.data?.title}>
                <div className="text-center space-y-4">
                    <div className="flex justify-center">
                        <div className="p-4 bg-zinc-800 rounded-2xl">
                            <NotebookIcon className="w-12 h-12 text-blue-500" />
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold text-zinc-100">
                        {blogData.data.title}
                    </h1>
                    <div className="flex flex-wrap gap-2 justify-center">
                        {blogData?.data?.tag
                            ?.split(',')
                            .map((tag: string, index: number) => (
                                <Badge
                                    key={index}
                                    variant={'outline'}
                                    className=""
                                >
                                    {tag.trim()}
                                </Badge>
                            ))}
                    </div>
                    <div className="w-full flex items-center justify-center gap-3 text-sm text-zinc-400 border-b pb-6">
                        <time dateTime="2025-06-13">
                            Published:
                            {new Date(blogData.data.createdAt).toDateString()}
                        </time>
                        <span>
                            Reading time: {blogData.data.readingTime} minutes
                        </span>
                        <span>Views: {formatNumber(blogData.data.views)}</span>
                    </div>
                </div>

                <div className="prose prose-invert max-w-none mt-6">
                    <div
                        dangerouslySetInnerHTML={{
                            __html: blogData.data.content,
                        }}
                    ></div>
                </div>
            </article>
        </div>
    );
}
