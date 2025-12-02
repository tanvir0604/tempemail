import { BlogDetailsType } from '@repo/validation';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from './ui/card';
import Link from 'next/link';
import { Clock, User } from 'lucide-react';
import { Button } from './ui/button';
import { limitWords } from '@/lib/utils';

export default async function BlogItem({ item }: { item: BlogDetailsType }) {
    return (
        <Card className="bg-transparent border">
            <CardHeader className="">
                <CardTitle className="text-lg font-bold transition-colors">
                    <Link href={'/blog/' + item.slug}>{item.title}</Link>
                </CardTitle>
            </CardHeader>

            <CardContent>
                <CardDescription className="mb-4">
                    {limitWords(item.content, 20)}
                </CardDescription>

                <div className="flex items-center justify-between text-sm  mb-4">
                    <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        <span>{'TEMPEMAIL'}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{item.readingTime} mins</span>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-sm ">
                        {new Date(item.publishedAt).toLocaleDateString()}
                    </span>

                    <Button
                        variant="outline"
                        size="sm"
                        className="border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300"
                        asChild
                    >
                        <Link href={'/blog/' + item.slug} className={'text-sm'}>
                            Read More
                        </Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
