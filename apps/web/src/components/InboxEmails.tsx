"use client";
import { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Loader2 } from "lucide-react";
import { Skeleton } from "./ui/skeleton";
import { EmailContentType } from "@repo/validation";
import InboxItem from "./InboxItem";

export default function InboxEmails({
    inboxData,
}: {
    inboxData: EmailContentType[];
}) {
    const [selectedEmail, setSelectedEmail] = useState<any>(null);
    const [inbox, setInbox] = useState<EmailContentType[]>(
        Array.isArray(inboxData) ? inboxData : []
    );

    // console.log("inboxData", inboxData);

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
                        Checking inbox for new emails ....
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
                            {inbox.length} email(s) in your inbox
                        </Badge>
                        <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
                    </div>

                    <div className="max-h-[600px] space-y-2 overflow-y-scroll">
                        {inbox.map((email: EmailContentType) => (
                            <InboxItem key={email.id} email={email} />
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}
