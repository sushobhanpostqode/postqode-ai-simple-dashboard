import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { User, Bot, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ChatMessage({ message, isUser, isLoading }) {
    const [copied, setCopied] = React.useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(message);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (isLoading) {
        return (
            <div className="flex gap-4 px-4 py-6 bg-[#161b22]">
                <div className="flex-shrink-0">
                    <div className="h-7 w-7 rounded-md bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                        <Bot className="h-4 w-4 text-white" />
                    </div>
                </div>
                <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-white">
                            Assistant
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                            <div className="w-2 h-2 bg-[#8b949e] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                            <div className="w-2 h-2 bg-[#8b949e] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                            <div className="w-2 h-2 bg-[#8b949e] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            className={`flex gap-4 px-4 py-6 ${isUser ? "bg-[#0d1117]" : "bg-[#161b22]"
                }`}
        >
            <div className="flex-shrink-0">
                {isUser ? (
                    <div className="h-7 w-7 rounded-md bg-[#21262d] border border-[#30363d] flex items-center justify-center">
                        <User className="h-4 w-4 text-[#8b949e]" />
                    </div>
                ) : (
                    <div className="h-7 w-7 rounded-md bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                        <Bot className="h-4 w-4 text-white" />
                    </div>
                )}
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-white">
                        {isUser ? "You" : "Assistant"}
                    </span>
                    {!isUser && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleCopy}
                            className="h-7 px-2 text-[#8b949e] hover:text-white hover:bg-[#21262d]"
                        >
                            {copied ? (
                                <Check className="h-3.5 w-3.5 mr-1" />
                            ) : (
                                <Copy className="h-3.5 w-3.5 mr-1" />
                            )}
                            <span className="text-xs">
                                {copied ? "Copied" : "Copy"}
                            </span>
                        </Button>
                    )}
                </div>
                <div className="markdown">
                    {isUser ? (
                        <p className="text-[#c9d1d9]">{message}</p>
                    ) : (
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {message}
                        </ReactMarkdown>
                    )}
                </div>
            </div>
        </div>
    );
}
