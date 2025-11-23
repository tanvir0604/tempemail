"use client";
import { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Forward, Loader2, Mail, Reply, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { EmailContentType } from "@repo/validation";

export default function InboxEmails({
  inboxData,
}: {
  inboxData: EmailContentType[];
}) {
  const [selectedEmail, setSelectedEmail] = useState<any>(null);
  const [inbox, setInbox] = useState<EmailContentType[]>(
    Array.isArray(inboxData) ? inboxData : []
  );

  console.log("inboxData", inboxData);

  useEffect(() => {
    setInbox(Array.isArray(inboxData) ? inboxData : []);
  }, [inboxData]);
  return (
    <>
      {inbox.length === 0 ? (
        <div className="space-y-2">
          <Badge variant="secondary" className="bg-zinc-800 text-zinc-300">
            Checking inbox for new emails ....
          </Badge>
          <Skeleton className="h-[100px] w-full" />
          <Skeleton className="h-[100px] w-full" />
          <Skeleton className="h-[100px] w-full" />
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex justify-between">
            <Badge variant="secondary" className="bg-zinc-800 text-zinc-300">
              {inbox.length} emails in your inbox
            </Badge>
            <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
          </div>

          {inbox.map((email: EmailContentType) => (
            <div
              key={email.id}
              onClick={() => setSelectedEmail(email)}
              className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                selectedEmail?.id === email.id
                  ? "bg-zinc-800 border-zinc-700"
                  : "bg-zinc-950 border-zinc-800 hover:bg-zinc-900"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`text-sm font-medium truncate ${email.id == selectedEmail?.id ? "text-zinc-100" : "text-zinc-400"}`}
                    >
                      {email.from}
                    </span>
                    {/* {email.unread && (
                        <Badge
                          variant="secondary"
                          className="bg-blue-500/20 text-blue-400 text-xs"
                        >
                          New
                        </Badge>
                      )} */}
                  </div>
                  <h3
                    className={`text-sm font-semibold mb-1 truncate ${email.id == selectedEmail?.id ? "text-zinc-100" : "text-zinc-400"}`}
                  >
                    {email.subject}
                  </h3>
                  <p className="text-sm text-zinc-500 truncate">{email.html}</p>
                </div>
                <span className="text-xs text-zinc-500 whitespace-nowrap">
                  {email.createdAt.toLocaleString()}
                </span>
              </div>

              {selectedEmail?.id === email.id && (
                <div className="mt-4 pt-4 border-t border-zinc-800">
                  <div className="flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-zinc-950 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100"
                    >
                      <Reply className="w-4 h-4 mr-2" />
                      Reply
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-zinc-950 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100"
                    >
                      <Forward className="w-4 h-4 mr-2" />
                      Forward
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-zinc-950 border-zinc-800 text-red-400 hover:bg-red-950 hover:text-red-300"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
