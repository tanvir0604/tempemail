import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Logo({ className }: { className: string }) {
    return (
        <Link
            href="/"
            className={cn(
                "flex items-center justify-center text-3xl",
                className
            )}
        >
            <span className=" font-extrabold">TEMP</span>
            <span className="text-blue-500 font-extrabold">EMAIL</span>
        </Link>
    );
}
