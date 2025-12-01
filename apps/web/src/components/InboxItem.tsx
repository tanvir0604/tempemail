'use client';

import { useState } from 'react';
import {
    ChevronDown,
    FileIcon,
    FileText,
    Mail,
    Paperclip,
    PaperclipIcon,
} from 'lucide-react';
import { EmailContentType, sanitize } from '@repo/validation';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import {
    FileImage,
    FileSpreadsheet,
    FileVideo,
    FileAudio,
    FileArchive,
    File,
} from 'lucide-react';
import Image from 'next/image';

const getFileIcon = (filename: string) => {
    const ext = filename.split('.').pop()?.toLowerCase();

    switch (ext) {
        case 'jpg':
        case 'jpeg':
        case 'png':
        case 'gif':
        case 'webp':
        case 'svg':
        case 'bmp':
            return FileImage;
        case 'pdf':
        case 'doc':
        case 'docx':
        case 'txt':
        case 'rtf':
            return FileText;
        case 'xls':
        case 'xlsx':
        case 'csv':
            return FileSpreadsheet;
        case 'mp4':
        case 'avi':
        case 'mov':
        case 'wmv':
        case 'mkv':
            return FileVideo;
        case 'mp3':
        case 'wav':
        case 'ogg':
        case 'm4a':
            return FileAudio;
        case 'zip':
        case 'rar':
        case '7z':
        case 'tar':
        case 'gz':
            return FileArchive;
        default:
            return File;
    }
};

const isImage = (filename: string) => {
    const ext = filename.split('.').pop()?.toLowerCase();
    return ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp'].includes(
        ext || '',
    );
};

export default function InboxItem({ email }: { email: EmailContentType }) {
    const [isExpanded, setIsExpanded] = useState(false);

    console.log('email', email);

    return (
        <div className="border-zinc-800 bg-zinc-900 rounded-lg border cursor-pointer transition-colors">
            <div
                onClick={() => setIsExpanded(!isExpanded)}
                className={cn(
                    'p-4 cursor-pointer transition-colors hover:bg-zinc-950',
                    isExpanded && 'bg-zinc-950',
                )}
            >
                <div className="flex items-start gap-3">
                    <div className="shrink-0 mt-1 hidden md:block">
                        <Mail className="w-5 h-5 text-blue-400" />
                    </div>

                    <div className="flex-1 min-w-0">
                        <div className="flex md:block gap-3 mb-2 md:mb-0 items-start">
                            <div className="shrink-0 mt-1 md:hidden">
                                <Mail className="w-5 h-5 text-blue-400" />
                            </div>
                            <div>
                                <div className="md:flex items-start justify-between gap-2 mb-1">
                                    <h3
                                        className={`flex gap-2 font-semibold text-sm text-white`}
                                    >
                                        {email.fromName}{' '}
                                        {'<' + email.from + '>'}
                                    </h3>

                                    {email.attachments &&
                                        email.attachments.length > 0 && (
                                            <span className="flex gap-1 items-center text-xs text-zinc-400 shrink-0">
                                                {email.attachments.length}{' '}
                                                <PaperclipIcon className="w-4 h-4" />
                                            </span>
                                        )}

                                    <span className="text-xs text-zinc-500 shrink-0">
                                        {new Date(
                                            email.createdAt,
                                        ).toLocaleDateString()}
                                        &nbsp;
                                        {new Date(
                                            email.createdAt,
                                        ).toLocaleTimeString()}
                                    </span>
                                </div>

                                <p className={`text-sm mb-1 text-zinc-200`}>
                                    {sanitize(email.subject)}
                                </p>
                            </div>

                            <div className="flex items-center gap-2 shrink-0 md:hidden">
                                <ChevronDown
                                    className={`w-4 h-4 text-zinc-500 transition-transform ${
                                        isExpanded ? 'rotate-180' : ''
                                    }`}
                                />
                            </div>
                        </div>

                        {!isExpanded ? (
                            <p className="text-xs text-zinc-500 truncate">
                                {sanitize(email.text).slice(0, 100)}
                            </p>
                        ) : (
                            <>
                                <div
                                    className="text-sm text-zinc-900 bg-zinc-50 md:p-4 rounded-none md:mt-6"
                                    dangerouslySetInnerHTML={{
                                        __html:
                                            email.html && email.html !== ''
                                                ? sanitize(email.html).replace(
                                                      /unsafe-src=/g,
                                                      'src=',
                                                  )
                                                : sanitize(email.text),
                                    }}
                                ></div>

                                {email.attachments &&
                                    email.attachments.length > 0 && (
                                        <div className="mt-4 pt-3 border-t border-zinc-800">
                                            <div className="flex items-center gap-2 text-xs text-zinc-400 mb-2">
                                                <Paperclip className="w-4 h-4" />
                                                <span>
                                                    {email.attachments.length}{' '}
                                                    attachment
                                                    {email.attachments.length >
                                                    1
                                                        ? 's'
                                                        : ''}
                                                </span>
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {email.attachments.map(
                                                    (
                                                        attachment: any,
                                                        idx: number,
                                                    ) => {
                                                        const FileIcon =
                                                            getFileIcon(
                                                                attachment.filename,
                                                            );
                                                        const showImagePreview =
                                                            isImage(
                                                                attachment.filename,
                                                            );

                                                        return (
                                                            <Link
                                                                href={
                                                                    '/api/file/' +
                                                                    attachment.filename
                                                                }
                                                                title={
                                                                    attachment.filename
                                                                }
                                                                target="_blank"
                                                                key={idx}
                                                                className="flex items-center gap-3 px-3 py-2 bg-zinc-900 rounded-md border border-zinc-800 hover:bg-zinc-800 transition-colors"
                                                            >
                                                                {/* Image Preview or Icon */}
                                                                {showImagePreview ? (
                                                                    <div className="relative w-10 h-10 rounded overflow-hidden shrink-0">
                                                                        <Image
                                                                            src={
                                                                                '/api/file/' +
                                                                                attachment.filename
                                                                            }
                                                                            alt={
                                                                                attachment.filename
                                                                            }
                                                                            fill
                                                                            className="object-cover"
                                                                            sizes="40px"
                                                                        />
                                                                    </div>
                                                                ) : (
                                                                    <FileIcon className="w-5 h-5 text-zinc-500 shrink-0" />
                                                                )}

                                                                {/* File Info */}
                                                                <div className="flex flex-col min-w-0 flex-1">
                                                                    <span className="text-xs text-zinc-300 truncate">
                                                                        {attachment.filename.slice(
                                                                            -20,
                                                                        )}
                                                                    </span>
                                                                    {attachment.size && (
                                                                        <span className="text-xs text-zinc-500">
                                                                            {(
                                                                                attachment.size /
                                                                                1024
                                                                            ).toFixed(
                                                                                1,
                                                                            )}{' '}
                                                                            KB
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </Link>
                                                        );
                                                    },
                                                )}
                                            </div>
                                        </div>
                                    )}
                            </>
                        )}
                    </div>

                    <div className="flex items-center gap-2 shrink-0 hidden md:block">
                        <ChevronDown
                            className={`w-4 h-4 text-zinc-500 transition-transform ${
                                isExpanded ? 'rotate-180' : ''
                            }`}
                        />
                    </div>
                </div>
            </div>

            {/* {isExpanded && (
        <div className="px-4 pb-4 pt-4 bg-zinc-900/50">
          <div
            className="text-sm text-zinc-300 whitespace-pre-wrap"
            dangerouslySetInnerHTML={{ __html: email.html }}
          ></div>

          <div className="mt-4 pt-4 border-t border-zinc-800 flex gap-2">
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors">
              Reply
            </button>
            <button className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white text-sm rounded transition-colors">
              Forward
            </button>
          </div>
        </div>
      )} */}
        </div>
    );
}
