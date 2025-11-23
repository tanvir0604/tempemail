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

export default function Inbox({
  emailData,
}: {
  emailData: TempEmailType | undefined;
}) {
  const [inboxData, setInboxData] = useState<EmailContentType[]>([]);
  const getEmailContentAction = async (email: string) => {
    const response = await getEmailContent(email);
    console.log("response", response);
    if (response && response.statusCode == 200) {
      setInboxData(response.data);
      return response.data;
    }
  };

  useEffect(() => {
    if (emailData) {
      getEmailContentAction(emailData.email);
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
        <InboxEmails inboxData={inboxData} />
      </CardContent>
    </Card>
  );
}
