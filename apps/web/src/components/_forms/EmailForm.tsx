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
import { useLocale, useTranslations } from 'next-intl';
import { Textarea } from '../ui/textarea';

export default function EmailForm({
    data,
    className,
    close,
}: {
    data: SendEmailDto;
    className?: string;
    close?: () => void;
}) {
    const t = useTranslations('HomePage');
    const locale = useLocale();
    const [isPending, startTransition] = useTransition();

    const form = useForm<SendEmailDto>({
        resolver: zodResolver(SendEmailSchema as any),
        defaultValues: {
            id: data.id,
            from: data.from,
            to: data.to,
            subject: data.subject,
            text: data.text,
            html: data.html,
            messageId: data.messageId,
            references: data.references,
            type: data.type,
        },
    });

    const onSubmit = (values: SendEmailDto) => {
        startTransition(async () => {
            const response = await sendEmail(values);
            if (response.statusCode == 200) {
                toast.error(t('Email.emailSuccessMsg'));
                close && close();
                revalidate('/' + locale);
            } else {
                toast.error(t('Email.emailFailedMsg'));
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

                    {data.type == 'forward' ? (
                        <span
                            className="mb-4 block border p-4 rounded-lg"
                            dangerouslySetInnerHTML={{
                                __html:
                                    (data?.html != ''
                                        ? data.html
                                        : data.text) ?? '',
                            }}
                        ></span>
                    ) : (
                        <FormField
                            control={form.control}
                            name="text"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('Email.message')}</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder={t(
                                                'Email.messagePlaceHolder',
                                            )}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription></FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    )}

                    <Button
                        disabled={isPending}
                        className="w-full cursor-pointer"
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
