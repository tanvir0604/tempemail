'use client';

import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { SendEmailDto, SendEmailSchema } from '@repo/validation';
import { useTransition } from 'react';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { sendEmail, revalidate } from '@/lib/actions';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Textarea } from '../ui/textarea';

export default function EmailForm({
    data,
    className,
    onSuccess,
}: {
    data: SendEmailDto;
    className?: string;
    onSuccess?: () => void;
}) {
    const t = useTranslations('HomePage');
    const [isPending, startTransition] = useTransition();

    const form = useForm<SendEmailDto>({
        resolver: zodResolver(SendEmailSchema),
        defaultValues: {
            from: data.from,
            to: data.to,
            subject: data.subject,
            text: data.text,
            html: data.html,
            messageId: data.messageId,
            references: data.references,
        },
    });

    const onSubmit = (values: SendEmailDto) => {
        startTransition(async () => {
            const response = await sendEmail(values);
            if (response.statusCode == 200) {
                toast.success(response.message);
                onSuccess && onSuccess();
                revalidate('/categories');
            } else {
                toast.error(response.message);
            }
            form.reset();
        });
    };

    return (
        <div className={cn(className)}>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    <FormField
                        control={form.control}
                        name="to"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t('Email.to')}</FormLabel>
                                <FormControl>
                                    <Input
                                        readOnly={data.type == 'reply'}
                                        type="email"
                                        placeholder={t('Email.toPlaceHolder')}
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription></FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="from"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t('Email.from')}</FormLabel>
                                <FormControl>
                                    <Input
                                        readOnly
                                        type="email"
                                        placeholder={t('Email.fromPlaceHolder')}
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription></FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="text"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t('Email.text')}</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder={t('Email.textPlaceHolder')}
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription></FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        disabled={isPending}
                        className="mt-2 border bg-primary text-primary-foreground border-input hover:bg-primary hover:text-white w-full rounded-lg cursor-pointer transition-all duration-300 ease-in-out"
                        variant={'outline'}
                    >
                        {isPending && (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        {data.type == 'send'
                            ? t('Email.send')
                            : data.type == 'forward'
                              ? t('Email.forward')
                              : t('Email.reply')}
                    </Button>
                </form>
            </Form>
        </div>
    );
}
