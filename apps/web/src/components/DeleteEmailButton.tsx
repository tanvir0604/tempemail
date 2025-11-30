'use client';

import { Loader2Icon, Trash2Icon } from 'lucide-react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from './ui/alert-dialog';
import { Button } from './ui/button';
import { useTransition } from 'react';
import { deleteEmail } from '@/lib/actions';
import { toast } from 'sonner';
import { TempEmailType } from '@repo/validation';
import { useTranslations } from 'next-intl';

export default function DeleteEmailButton({
    emailData,
    disabled = false,
}: {
    emailData: TempEmailType | undefined;
    disabled?: boolean;
}) {
    const [pending, startTransition] = useTransition();
    const t = useTranslations('HomePage');
    const c = useTranslations('Common');

    const deleteEmailAction = () => {
        startTransition(async () => {
            if (!emailData) return;
            const response = await deleteEmail(emailData);
            if (response && response.statusCode == 200) {
                localStorage.removeItem('temp_email');
                toast.success('Email Deleted');
                window.location.reload();
                return;
            }
            toast.error(response.message);
        });
    };
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    disabled={pending || disabled}
                    className="bg-zinc-950 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100 cursor-pointer"
                >
                    <Trash2Icon className="w-4 h-4 mr-2" />
                    {pending ? (
                        <span className="flex gap-2">
                            <Loader2Icon className="w-4 h-4 mr-2 animate-spin" />{' '}
                            {t('deleting')}...
                        </span>
                    ) : (
                        <span>{t('delete_email')}</span>
                    )}
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        {t('delete_email_alert_text')}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="cursor-pointer">
                        {c('cancel')}
                    </AlertDialogCancel>
                    <AlertDialogAction
                        disabled={pending || disabled}
                        onClick={deleteEmailAction}
                        className="cursor-pointer"
                    >
                        {c('continue')}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
