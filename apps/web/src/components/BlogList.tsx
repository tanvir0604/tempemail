import { getBlogList } from '@/lib/actions';
import { BlogDetailsType, GetListDto } from '@repo/validation';
import BlogItem from './BlogItem';

export default async function BlogList({
    searchParams,
}: {
    searchParams: GetListDto;
}) {
    // await new Promise((resolve) => setTimeout(resolve, 5000));
    const items = await getBlogList(searchParams);
    if (!items || items.statusCode !== 200)
        return <div>Something went wrong</div>;

    const blogData: BlogDetailsType[] = items.data;

    if (blogData.length === 0) return <div>No blog found</div>;
    return (
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
            {blogData.map((item: BlogDetailsType) => (
                <BlogItem key={item.id} item={item} />
            ))}
        </div>
    );
}
