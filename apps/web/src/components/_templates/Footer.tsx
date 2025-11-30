import { Mail } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

export default async function Footer() {
    const f = await getTranslations('Footer');
    return (
        <footer className="border-t border-zinc-800 md:mt-20 py-8 px-4 md:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Mail className="w-5 h-5 text-blue-500" />
                        <span className="text-zinc-400">
                            © 2025 TempEmail. {f('all_rights_reserved')}
                        </span>
                    </div>
                    <div className="flex gap-6 text-sm">
                        <Link
                            href="/"
                            className="text-zinc-400 hover:text-zinc-100 transition-colors"
                        >
                            {f('home')}
                        </Link>
                        <Link
                            href="/about"
                            className="text-zinc-400 hover:text-zinc-100 transition-colors"
                        >
                            {f('about')}
                        </Link>
                        <Link
                            href="/terms"
                            className="text-zinc-400 hover:text-zinc-100 transition-colors"
                        >
                            {f('terms')}
                        </Link>
                        <Link
                            href="/privacy"
                            className="text-zinc-400 hover:text-zinc-100 transition-colors"
                        >
                            {f('privacy')}
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
