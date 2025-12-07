'use client';

import { TempEmailType } from '@repo/validation';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Loader2Icon, TimerResetIcon } from 'lucide-react';
import { toast } from 'sonner';
import { useTransition } from 'react';
import { extendTime } from '@/lib/actions';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { sendGTMEvent } from '@next/third-parties/google';

export default function ExtendTime({
    emailData,
    disabled,
}: {
    emailData: TempEmailType | undefined;
    disabled: boolean;
}) {
    const [pending, startTransition] = useTransition();
    const t = useTranslations('HomePage');
    const c = useTranslations('Common');
    const extendTimeAction = () => {
        if (!emailData) return;
        startTransition(async () => {
            sendGTMEvent({ event: 'buttonClicked', value: 'extend_time' });
            const response = await extendTime(emailData.id);
            if (response && response.statusCode == 200) {
                // console.log('response', response);
                const emailData = JSON.parse(
                    localStorage.getItem('temp_email') ?? '{}',
                );
                localStorage.removeItem('temp_email');
                const responseData = response.data[0];
                localStorage.setItem(
                    'temp_email',
                    JSON.stringify({
                        ...emailData,
                        ...responseData,
                        expiredAt: new Date(responseData.expiredAt),
                    }),
                );
                toast.success('Time Extended');
                setTimeout(() => window.location.reload(), 0);
            } else {
                toast.error(response.message);
            }
        });
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    disabled={disabled || pending}
                    className="bg-zinc-950 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100 cursor-pointer"
                >
                    <TimerResetIcon className="w-4 h-4 mr-2" />
                    {pending ? (
                        <span className="flex gap-2">
                            <Loader2Icon className="w-4 h-4 mr-2 animate-spin" />{' '}
                            {t('extending')}...
                        </span>
                    ) : (
                        <span>{t('extend_time')}</span>
                    )}
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-zinc-900">
                <AlertDialogHeader>
                    <AlertDialogTitle>{t('extend_time')}?</AlertDialogTitle>
                    <AlertDialogDescription>
                        {t('extend_time_alert_text')}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="cursor-pointer">
                        {c('cancel')}
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={extendTimeAction}
                        className="cursor-pointer"
                    >
                        {c('continue')}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
            <AlertDialogOverlay className="fixed inset-0 bg-black/50 backdrop-blur-lg" />
        </AlertDialog>
    );
}
