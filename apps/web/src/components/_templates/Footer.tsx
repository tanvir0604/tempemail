import { Mail } from "lucide-react";
import Link from "next/link";

export default async function Footer() {
    return (
        <footer className="border-t border-zinc-800 mt-20 py-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Mail className="w-5 h-5 text-blue-500" />
                        <span className="text-zinc-400">
                            © 2025 TempEMail. All rights reserved.
                        </span>
                    </div>
                    <div className="flex gap-6 text-sm">
                        <Link
                            href="/"
                            className="text-zinc-400 hover:text-zinc-100 transition-colors"
                        >
                            Home
                        </Link>
                        <Link
                            href="/about"
                            className="text-zinc-400 hover:text-zinc-100 transition-colors"
                        >
                            About
                        </Link>
                        <Link
                            href="/terms"
                            className="text-zinc-400 hover:text-zinc-100 transition-colors"
                        >
                            Terms
                        </Link>
                        <Link
                            href="/privacy"
                            className="text-zinc-400 hover:text-zinc-100 transition-colors"
                        >
                            Privacy
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
