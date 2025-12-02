import BlogList from '@/components/BlogList';
import { Skeleton } from '@/components/ui/skeleton';
import { GetListDto } from '@repo/validation';
import { Suspense } from 'react';

export default async function BlogPage(props: {
    searchParams: Promise<GetListDto>;
}) {
    const searchParams = await props.searchParams;
    return (
        <div className="max-w-6xl mx-auto">
            <div className="mb-8 text-center">
                <h1 className="text-4xl">All Blog Posts</h1>
            </div>
            <Suspense
                fallback={
                    <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
                        <Skeleton className="w-full h-[200px]" />
                        <Skeleton className="w-full h-[200px]" />
                        <Skeleton className="w-full h-[200px]" />
                        <Skeleton className="w-full h-[200px]" />
                        <Skeleton className="w-full h-[200px]" />
                        <Skeleton className="w-full h-[200px]" />
                        <Skeleton className="w-full h-[200px]" />
                        <Skeleton className="w-full h-[200px]" />
                    </div>
                }
            >
                <BlogList searchParams={searchParams} />
            </Suspense>
        </div>
    );
}
