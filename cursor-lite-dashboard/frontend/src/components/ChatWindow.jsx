import React, { useRef, useEffect } from "react";
import ChatMessage from "./ChatMessage";

export default function ChatWindow({ messages, isLoading }) {
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isLoading]);

    return (
        <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto bg-[#0d1117]"
        >
            {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full px-4">
                    <div className="text-center space-y-4">
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mx-auto">
                            <svg
                                className="h-6 w-6 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                                />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-lg font-medium text-white">
                                How can I help you today?
                            </h2>
                            <p className="text-sm text-[#8b949e] mt-2 max-w-md">
                                Start a conversation with your AI assistant. You can ask questions, request code, or have a discussion.
                            </p>
                        </div>
                        <div className="flex flex-wrap justify-center gap-2 mt-6">
                            {[
                                "Explain React hooks",
                                "Write a Python function",
                                "Debug my code",
                                "Optimize this query",
                            ].map((suggestion) => (
                                <button
                                    key={suggestion}
                                    className="px-3 py-1.5 text-xs bg-[#21262d] border border-[#30363d] rounded-full text-[#8b949e] hover:text-white hover:border-[#484f58] transition-colors"
                                >
                                    {suggestion}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="divide-y divide-[#30363d]">
                    {messages.map((msg, index) => (
                        <ChatMessage
                            key={index}
                            message={msg.content}
                            isUser={msg.isUser}
                            isLoading={false}
                        />
                    ))}
                    {isLoading && <ChatMessage message="" isUser={false} isLoading={true} />}
                </div>
            )}
        </div>
    );
}
