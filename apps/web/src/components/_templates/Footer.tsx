import { Mail } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import LanguageSwitcher from '../LanguageSwitcher';

export default async function Footer({
    showLanguageSwitcher = true,
}: {
    showLanguageSwitcher?: boolean;
}) {
    const f = await getTranslations('Footer');
    return (
        <footer className="border-t border-zinc-800 md:mt-20 py-8 px-4 md:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Mail className="w-5 h-5 text-blue-500" />
                        <span className="dark:text-zinc-300">
                            © 2025 TempEmail. {f('all_rights_reserved')}
                        </span>
                    </div>
                    <div className="flex gap-6 text-sm items-center">
                        <Link
                            href="/"
                            className="dark:text-zinc-300 dark:hover:text-zinc-100 text-zinc-900 hover:text-zinc-950 transition-colors"
                        >
                            {f('home')}
                        </Link>
                        <Link
                            href="/about"
                            className="dark:text-zinc-300 dark:hover:text-zinc-100 text-zinc-900 hover:text-zinc-950 transition-colors"
                        >
                            {f('about')}
                        </Link>
                        <Link
                            href="/terms"
                            className="dark:text-zinc-300 dark:hover:text-zinc-100 text-zinc-900 hover:text-zinc-950 transition-colors"
                        >
                            {f('terms')}
                        </Link>
                        <Link
                            href="/privacy"
                            className="dark:text-zinc-300 dark:hover:text-zinc-100 text-zinc-900 hover:text-zinc-950 transition-colors"
                        >
                            {f('privacy')}
                        </Link>
                        {showLanguageSwitcher && <LanguageSwitcher />}
                    </div>
                </div>
            </div>
        </footer>
    );
}
