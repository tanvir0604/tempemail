import { cn } from '@/lib/utils';
import { getLocale } from 'next-intl/server';
import Link from 'next/link';

export default async function Logo({ className }: { className?: string }) {
    const locale = await getLocale();
    return (
        <Link
            href={'/' + locale}
            className={cn(
                'flex items-center justify-center text-3xl',
                className,
            )}
        >
            <span className=" font-extrabold">TEMP</span>
            <span className="text-blue-500 font-extrabold">EMAIL</span>
        </Link>
    );
}
