import React, { useState } from "react";
import { Cpu, Loader2 } from "lucide-react";
import ChatWindow from "@/components/ChatWindow";
import ChatInput from "@/components/ChatInput";
import { useModelConfigStore } from "@/store/modelConfigStore";
import { useSendPrompt } from "@/hooks/useChat";

export default function Chat() {
    const [messages, setMessages] = useState([]);
    const { mutate: sendPrompt, isPending: isLoading } = useSendPrompt();

    // Access model config from store
    const { selectedModel, temperature, maxTokens, topP, availableModels } =
        useModelConfigStore();

    const selectedModelName =
        availableModels.find((m) => m.id === selectedModel)?.name || selectedModel;

    const handleSend = async (content) => {
        // Add user message
        const userMessage = { content, isUser: true };
        setMessages((prev) => [...prev, userMessage]);

        // Get config
        const config = {
            model: selectedModel,
            temperature,
            maxTokens,
            topP,
        };

        // Send to API
        sendPrompt(
            { prompt: content, config },
            {
                onSuccess: (data) => {
                    const aiMessage = { content: data.content, isUser: false };
                    setMessages((prev) => [...prev, aiMessage]);
                },
                onError: (error) => {
                    console.error("Error sending prompt:", error);
                    const errorMessage = {
                        content: "Sorry, there was an error processing your request.",
                        isUser: false,
                    };
                    setMessages((prev) => [...prev, errorMessage]);
                },
            }
        );
    };

    return (
        <div className="flex flex-col h-full bg-[#0d1117]">
            {/* Model Config Bar */}
            <div className="h-10 flex items-center px-4 bg-[#161b22] border-b border-[#30363d]">
                <div className="flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-1.5 text-[#8b949e]">
                        <Cpu className="h-3.5 w-3.5" />
                        <span className="font-medium text-white">
                            {selectedModelName}
                        </span>
                    </div>
                    <div className="h-3 w-px bg-[#30363d]" />
                    <div className="flex items-center gap-1.5 text-[#8b949e]">
                        <span>Temp:</span>
                        <span className="font-mono text-white">
                            {temperature}
                        </span>
                    </div>
                    <div className="h-3 w-px bg-[#30363d]" />
                    <div className="flex items-center gap-1.5 text-[#8b949e]">
                        <span>Tokens:</span>
                        <span className="font-mono text-white">
                            {maxTokens}
                        </span>
                    </div>
                    <div className="h-3 w-px bg-[#30363d]" />
                    <div className="flex items-center gap-1.5 text-[#8b949e]">
                        <span>Top P:</span>
                        <span className="font-mono text-white">{topP}</span>
                    </div>
                    {isLoading && (
                        <>
                            <div className="h-3 w-px bg-[#30363d]" />
                            <Loader2 className="h-3 w-3 animate-spin text-[#1f6feb]" />
                            <span className="text-[#8b949e]">Sending...</span>
                        </>
                    )}
                </div>
            </div>

            {/* Chat Window */}
            <ChatWindow messages={messages} isLoading={isLoading} />

            {/* Chat Input */}
            <ChatInput onSend={handleSend} disabled={isLoading} />
        </div>
    );
}
