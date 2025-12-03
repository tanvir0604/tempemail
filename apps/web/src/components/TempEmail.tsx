'use client';

import { Clock, Copy, Loader2Icon, Mail, RefreshCw } from 'lucide-react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from './ui/card';

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip';

import { Input } from './ui/input';
import { useEffect, useState, useTransition } from 'react';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { TempEmailType } from '@repo/validation';
import TimeLeft from './TimeLeft';
import QRCode from './QRCode';
import ExtendTime from './ExtendTime';
import DeleteEmailButton from './DeleteEmailButton';
import { useTranslations } from 'next-intl';

export default function TempEmail({
    emailData,
    generateNewEmail,
    generatingEmail = false,
}: {
    emailData: TempEmailType | undefined;
    generateNewEmail: () => void;
    generatingEmail?: boolean;
}) {
    const t = useTranslations('HomePage');
    const [pending, startTransition] = useTransition();
    const generateNewEmailAction = () => {
        localStorage.removeItem('temp_email');
        startTransition(() => generateNewEmail());
    };

    const [email, setEmail] = useState<string | undefined>(undefined);
    const [expiredAt, setExpiredAt] = useState<Date>(new Date());
    const [waitTill, setWaitTill] = useState<Date>(
        new Date(emailData?.waitTill ?? new Date()),
    );
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (emailData) {
            setEmail(emailData.email);
            setExpiredAt(
                emailData.expiredAt
                    ? new Date(emailData.expiredAt)
                    : new Date(),
            );
            setWaitTill(
                emailData.waitTill ? new Date(emailData.waitTill) : new Date(),
            );
        }
    }, [emailData]);

    const copyEmail = () => {
        navigator.clipboard.writeText(email ?? '');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // console.log('emailData', emailData);

    return (
        <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-zinc-50">
                    <Mail className="w-5 h-5" />
                    {t('your_temp_email')}
                </CardTitle>
                <CardDescription className="text-zinc-400">
                    {t('this_email_will_expire')}{' '}
                    <TimeLeft expiredAt={expiredAt} />
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Email Display */}
                <div className="flex items-center gap-2 p-4 bg-zinc-950 border border-zinc-800 rounded-lg">
                    <Input
                        value={email ?? 'Generating email...'}
                        aria-label="Temporary email address"
                        readOnly
                        className="flex-1 bg-transparent border-none text-lg font-mono text-zinc-100 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />

                    {email ? (
                        <Button
                            variant="link"
                            size="icon"
                            name="copy_to_clipboard"
                            aria-label="Copy to clipboard"
                            onClick={copyEmail}
                            disabled={
                                !email ||
                                generatingEmail ||
                                pending ||
                                expiredAt < new Date()
                            }
                            className="text-zinc-400 hover:text-zinc-100 no-underline hover:no-underline cursor-pointer"
                        >
                            {copied ? (
                                <span className="text-green-500 text-xs font-medium">
                                    {t('copied')}!
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
                            disabled={
                                !email ||
                                generatingEmail ||
                                pending ||
                                expiredAt < new Date()
                            }
                            className="bg-zinc-950 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100 cursor-pointer"
                        >
                            <Copy className="w-4 h-4 mr-2" />
                            {t('copy')}
                        </Button>
                        <QRCode
                            url={
                                process.env.NEXT_PUBLIC_BASE_URL +
                                '/' +
                                emailData?.id
                            }
                            disabled={
                                !email ||
                                generatingEmail ||
                                pending ||
                                expiredAt < new Date()
                            }
                        />
                        {/* <Button
              variant="outline"
              size="sm"
              disabled={!email || generatingEmail}
              className="bg-zinc-950 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100 cursor-pointer"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button> */}

                        <ExtendTime
                            emailData={emailData}
                            disabled={!email || generatingEmail || pending}
                        />

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    title={t('new_email')}
                                    disabled={
                                        !email ||
                                        generatingEmail ||
                                        pending ||
                                        waitTill > new Date()
                                    }
                                    onClick={generateNewEmailAction}
                                    className="bg-zinc-950 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100 cursor-pointer"
                                >
                                    {pending || generatingEmail ? (
                                        <Loader2Icon className="w-4 h-4 mr-2 animate-spin" />
                                    ) : (
                                        <RefreshCw className="w-4 h-4 mr-2" />
                                    )}
                                    <>{t('new_email')}</>
                                    {waitTill > new Date() && (
                                        <>
                                            &nbsp; (
                                            <TimeLeft
                                                expiredAt={waitTill}
                                                reversed={true}
                                                onComplete={() => {
                                                    setWaitTill(new Date());
                                                }}
                                            />
                                            )
                                        </>
                                    )}
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>{t('new_email')}</TooltipContent>
                        </Tooltip>

                        <DeleteEmailButton
                            emailData={emailData ?? undefined}
                            disabled={!email || generatingEmail || pending}
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
