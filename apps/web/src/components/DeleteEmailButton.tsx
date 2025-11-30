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

export default function DeleteEmailButton({
    emailData,
    disabled = false,
}: {
    emailData: TempEmailType | undefined;
    disabled?: boolean;
}) {
    const [pending, startTransition] = useTransition();

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
                            Deleting...
                        </span>
                    ) : (
                        <span>Delete Email</span>
                    )}
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        You are about to delete this email. This action cannot
                        be undone. All data will be permanently deleted.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="cursor-pointer">
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        disabled={pending || disabled}
                        onClick={deleteEmailAction}
                        className="cursor-pointer"
                    >
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
