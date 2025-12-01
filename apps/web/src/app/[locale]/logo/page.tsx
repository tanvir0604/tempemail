import { MailCheckIcon, MailIcon, SliceIcon } from 'lucide-react';

export default async function LogoPage() {
    return (
        <div className="absolute h-full w-full m-0 top-0 left-0 bg-white flex items-center justify-center">
            <div className="border p-48 rounded-full bg-black">
                <SliceIcon
                    className="w-128 h-128 text-blue-100"
                    stroke="currentColor"
                    strokeWidth={3}
                />
            </div>
        </div>
    );
}
