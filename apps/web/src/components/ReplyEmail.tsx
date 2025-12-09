'use client';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogOverlay,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Reply } from 'lucide-react';
import EmailForm from './_forms/EmailForm';
import { useTranslations } from 'next-intl';
import { EmailContentType } from '@repo/validation';
import { useState } from 'react';

export function ReplyEmail({ emailData }: { emailData: EmailContentType }) {
    const t = useTranslations('HomePage');
    const [open, setOpen] = useState(false);

    const close = () => {
        setOpen(false);
    };
    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button className="flex cursor-pointer bg-blue-600 text-whites">
                        <Reply className="w-4 h-4 mr-1" />
                        {t('Email.reply')}
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] bg-zinc-900">
                    <DialogHeader>
                        <DialogTitle>{t('Email.replyTitle')}</DialogTitle>
                        <DialogDescription>
                            {t('Email.replyDescription')}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <EmailForm
                            data={{
                                id: emailData.id,
                                to: emailData.from,
                                from: emailData.to,
                                subject: 'Re: ' + emailData.subject,
                                messageId: emailData.messageId,
                                references: emailData.references,
                                text: '',
                                html: '',
                                type: 'reply',
                            }}
                            close={close}
                        />
                    </div>
                </DialogContent>
                <DialogOverlay className="fixed inset-0 bg-black/50 backdrop-blur-lg" />
            </form>
        </Dialog>
    );
}
