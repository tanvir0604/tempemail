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
import { Forward } from 'lucide-react';
import EmailForm from './_forms/EmailForm';
import { useTranslations } from 'next-intl';
import { EmailContentType } from '@repo/validation';
import { useState } from 'react';

export function ForwardEmail({ emailData }: { emailData: EmailContentType }) {
    const t = useTranslations('HomePage');
    const [open, setOpen] = useState(false);

    const close = () => {
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <form>
                <DialogTrigger asChild>
                    <Button className="flex cursor-pointer" variant={'outline'}>
                        <Forward className="w-4 h-4 mr-1" />
                        {t('Email.forward')}
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] bg-zinc-900">
                    <DialogHeader>
                        <DialogTitle>{t('Email.forwardTitle')}</DialogTitle>
                        <DialogDescription>
                            {t('Email.forwardDescription')}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <EmailForm
                            data={{
                                to: '',
                                from: emailData.to,
                                subject: 'Fwd: ' + emailData.subject,
                                messageId: '',
                                references: '',
                                text: emailData.text,
                                html: emailData.html,
                                type: 'forward',
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
