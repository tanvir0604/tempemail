'use client';

import { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Button } from './ui/button';
import { QrCode } from 'lucide-react';

export default function QRCode({
    url,
    disabled,
}: {
    url: string;
    disabled?: boolean;
}) {
    const [hover, setHover] = useState(false);

    return (
        <div className="relative inline-block">
            <Button
                onClick={() => setHover(!hover)}
                variant="outline"
                size="sm"
                disabled={disabled}
                className="bg-zinc-950 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100 cursor-pointer"
            >
                <QrCode className="w-4 h-4 mr-2" />
                QR Code
            </Button>

            {hover && (
                <div className="absolute left-1/2 -translate-x-1/2 mt-2 p-2 bg-white shadow-lg rounded-md border z-10">
                    <QRCodeCanvas value={url} size={200} />
                </div>
            )}
        </div>
    );
}
