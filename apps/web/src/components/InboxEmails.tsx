'use client';
import { useEffect, useState } from 'react';
import { Badge } from './ui/badge';
import { Loader2 } from 'lucide-react';
import { Skeleton } from './ui/skeleton';
import { EmailContentType } from '@repo/validation';
import InboxItem from './InboxItem';
import { Input } from './ui/input';
import { useTranslations } from 'next-intl';

export default function InboxEmails({
    inboxData,
}: {
    inboxData: EmailContentType[];
}) {
    const t = useTranslations('HomePage');
    const [inbox, setInbox] = useState<EmailContentType[]>(
        Array.isArray(inboxData) ? inboxData : [],
    );

    useEffect(() => {
        setInbox(Array.isArray(inboxData) ? inboxData : []);
    }, [inboxData]);
    return (
        <>
            {inbox.length === 0 ? (
                <div className="space-y-2">
                    <Badge
                        variant="secondary"
                        className="bg-zinc-800 text-zinc-300"
                    >
                        {t('checking_inbox_text')} ....
                    </Badge>
                    <Skeleton className="h-[100px] w-full" />
                    <Skeleton className="h-[100px] w-full" />
                    <Skeleton className="h-[100px] w-full" />
                </div>
            ) : (
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <Badge
                            variant="secondary"
                            className="bg-zinc-800 text-zinc-300"
                        >
                            {inbox.length} {t('email_in_inbox')}
                        </Badge>
                        {/* <Input
                            placeholder="search.."
                            className="max-w-[200px]"
                        /> */}
                        <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
                    </div>

                    <div className="space-y-2">
                        {inbox.map((email: EmailContentType) => (
                            <InboxItem key={email.id} email={email} />
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}
