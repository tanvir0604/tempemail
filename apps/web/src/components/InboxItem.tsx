"use client";

import { useState } from "react";
import { ChevronDown, Mail } from "lucide-react";
import { EmailContentType, sanitize } from "@repo/validation";
import { cn } from "@/lib/utils";

export default function InboxItem({ email }: { email: EmailContentType }) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="border-zinc-800 bg-zinc-900 rounded-lg border cursor-pointer transition-colors">
            <div
                onClick={() => setIsExpanded(!isExpanded)}
                className={cn(
                    "p-4 cursor-pointer transition-colors hover:bg-zinc-950",
                    isExpanded && "bg-zinc-950"
                )}
            >
                <div className="flex items-start gap-3">
                    <div className="shrink-0 mt-1">
                        <Mail className="w-5 h-5 text-blue-400" />
                    </div>

                    <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                            <h3 className={`font-semibold text-sm text-white`}>
                                {email.fromName} {"<" + email.from + ">"}
                            </h3>
                            <span className="text-xs text-zinc-500 shrink-0">
                                {new Date(email.createdAt).toLocaleDateString()}
                                &nbsp;
                                {new Date(email.createdAt).toLocaleTimeString()}
                            </span>
                        </div>

                        <p className={`text-sm mb-1 text-zinc-200`}>
                            {sanitize(email.subject)}
                        </p>

                        {!isExpanded ? (
                            <p className="text-xs text-zinc-500 truncate">
                                {sanitize(email.text).slice(0, 100)}
                            </p>
                        ) : (
                            <div
                                className="text-sm text-zinc-300! whitespace-pre-wrap"
                                style={{
                                    all: "initial",
                                }}
                                dangerouslySetInnerHTML={{
                                    __html:
                                        email.html && email.html !== ""
                                            ? sanitize(email.html).replace(
                                                  /color\s*:\s*black/gi,
                                                  "color: gray"
                                              )
                                            : sanitize(email.text),
                                }}
                            ></div>
                        )}
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                        {/* <button
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="hover:text-yellow-400 text-zinc-600 transition-colors"
            >
              <Star className="w-4 h-4" />
            </button> */}
                        <ChevronDown
                            className={`w-4 h-4 text-zinc-500 transition-transform ${
                                isExpanded ? "rotate-180" : ""
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
