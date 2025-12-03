import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Reply } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

export async function DialogDemo() {
    const t = await getTranslations('HomePage');
    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button className="flex cursor-pointer bg-blue-600 text-whites">
                        <Reply className="w-4 h-4 mr-1" />
                        {t('Email.reply')}
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{t('Email.title')}</DialogTitle>
                        <DialogDescription>
                            {t('Email.description')}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="name-1">Name</Label>
                            <Input
                                id="name-1"
                                name="name"
                                defaultValue="Pedro Duarte"
                            />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="username-1">Username</Label>
                            <Input
                                id="username-1"
                                name="username"
                                defaultValue="@peduarte"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    );
}
