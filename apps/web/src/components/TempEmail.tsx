"use client";

import {
  Clock,
  Copy,
  Loader2Icon,
  Mail,
  QrCode,
  RefreshCw,
  Share2,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { TempEmailType } from "@repo/validation";
import TimeLeft from "./TimeLeft";
import QRCode from "./QRCode";
import ExtendTime from "./ExtendTime";

export default function TempEmail({
  emailData,
  generateNewEmail,
}: {
  emailData: TempEmailType | undefined;
  generateNewEmail: () => void;
}) {
  const generateNewEmailAction = () => {
    localStorage.removeItem("temp_email");
    generateNewEmail();
  };

  console.log(emailData);
  const [email, setEmail] = useState<string | undefined>(undefined);
  const [expiredAt, setExpiredAt] = useState<Date>(new Date());
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (emailData) {
      setEmail(emailData.email);
      setExpiredAt(
        emailData.expiredAt ? new Date(emailData.expiredAt) : new Date()
      );
    }
  }, [emailData]);

  const copyEmail = () => {
    navigator.clipboard.writeText(email ?? "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-zinc-50">
          <Mail className="w-5 h-5" />
          Your Temporary Email Address
        </CardTitle>
        <CardDescription className="text-zinc-400">
          This email will expire in <TimeLeft expiredAt={expiredAt} />
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Email Display */}
        <div className="flex items-center gap-2 p-4 bg-zinc-950 border border-zinc-800 rounded-lg">
          <Input
            value={email ?? "Generating email..."}
            readOnly
            className="flex-1 bg-transparent border-none text-lg font-mono text-zinc-100 focus-visible:ring-0 focus-visible:ring-offset-0"
          />

          {email ? (
            <Button
              variant="ghost"
              size="icon"
              onClick={copyEmail}
              disabled={!email}
              className="text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 cursor-pointer"
            >
              {copied ? (
                <span className="text-green-500 text-xs font-medium">
                  Copied!
                </span>
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          ) : (
            <Loader2Icon className="w-4 h-4 text-zinc-400 animate-spin" />
          )}
        </div>

        {/* Timer and Actions */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg">
            <Clock className="w-4 h-4 text-zinc-400" />
            <span className="font-mono text-sm text-zinc-300">
              <TimeLeft expiredAt={expiredAt} />
            </span>
          </div>

          <Separator
            orientation="vertical"
            className="h-8 bg-zinc-800 hidden sm:block"
          />

          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={copyEmail}
              disabled={!email}
              className="bg-zinc-950 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100 cursor-pointer"
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </Button>
            <QRCode url={"/" + emailData?.id} disabled={!email} />
            {/* <Button
              variant="outline"
              size="sm"
              disabled={!email}
              className="bg-zinc-950 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100 cursor-pointer"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button> */}

            <ExtendTime emailData={emailData} disabled={!email} />

            <Button
              variant="outline"
              size="sm"
              disabled={!email}
              onClick={generateNewEmailAction}
              className="bg-zinc-950 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              New Email
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
