"use client";

import { Mail } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import InboxEmails from "./InboxEmails";
import { EmailContentType, TempEmailType } from "@repo/validation";
import { useEffect, useState } from "react";
import { getEmailContent } from "@/lib/actions";
import { notifyWithSound } from "@/lib/utils";

export default function Inbox({
  emailData,
}: {
  emailData: TempEmailType | undefined;
}) {
  const [inboxData, setInboxData] = useState<EmailContentType[]>([]);
  const getEmailContentAction = async (email: string) => {
    const response = await getEmailContent(email);
    if (response && response.statusCode === 200) {
      setInboxData((prev) => {
        if (prev.length < response.data.length) {
          console.log("New email arrived at your inbox!");
          notifyWithSound("Temp Email", "New email arrived at your inbox!");
        }
        return response.data;
      });

      return response.data;
    }
  };

  useEffect(() => {
    if (emailData) {
      if (emailData.expiredAt && emailData.expiredAt < new Date()) return;
      getEmailContentAction(emailData.email);
      const interval = setInterval(() => {
        getEmailContentAction(emailData.email);
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [emailData]);

  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-zinc-50">
          <span className="flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Inbox
          </span>
        </CardTitle>
        <CardDescription className="text-zinc-400">
          Emails sent to your temporary address appear here
        </CardDescription>
      </CardHeader>
      <CardContent>
        {emailData &&
        emailData.expiredAt &&
        emailData.expiredAt < new Date() ? (
          <span className="text-red-500">
            Email address has been expired. Please extend time or create new
            email!!
          </span>
        ) : (
          <InboxEmails inboxData={inboxData} />
        )}
      </CardContent>
    </Card>
  );
}
