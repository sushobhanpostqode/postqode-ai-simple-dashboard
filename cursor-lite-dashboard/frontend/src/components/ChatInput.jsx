import React, { useState, useRef } from "react";
import { Send, Paperclip, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ChatInput({ onSend, disabled }) {
    const [input, setInput] = useState("");
    const textareaRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim() && !disabled) {
            onSend(input.trim());
            setInput("");
            if (textareaRef.current) {
                textareaRef.current.style.height = "auto";
            }
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    const handleInput = (e) => {
        const target = e.target;
        target.style.height = "auto";
        target.style.height = `${Math.min(target.scrollHeight, 200)}px`;
    };

    return (
        <div className="border-t border-[#30363d] bg-[#0d1117] p-4">
            <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
                <div className="relative flex items-end gap-2 bg-[#161b22] border border-[#30363d] rounded-xl p-3 focus-within:border-[#1f6feb] focus-within:ring-1 focus-within:ring-[#1f6feb]/20 transition-all">
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        disabled={disabled}
                        className="flex-shrink-0 h-8 w-8 text-[#8b949e] hover:text-white hover:bg-[#21262d] disabled:opacity-50"
                    >
                        <Paperclip className="h-4 w-4" />
                    </Button>

                    <textarea
                        ref={textareaRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        onInput={handleInput}
                        placeholder="Send a message..."
                        disabled={disabled}
                        rows={1}
                        className="flex-1 bg-transparent text-sm text-white placeholder:text-[#8b949e] resize-none outline-none min-h-[24px] max-h-[200px] py-1.5 disabled:opacity-50"
                    />

                    <div className="flex items-center gap-1">
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            disabled={disabled}
                            className="h-8 w-8 text-[#8b949e] hover:text-white hover:bg-[#21262d] disabled:opacity-50"
                        >
                            <Mic className="h-4 w-4" />
                        </Button>

                        <Button
                            type="submit"
                            size="icon"
                            disabled={disabled || !input.trim()}
                            className="h-8 w-8 bg-[#1f6feb] hover:bg-[#388bfd] text-white disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Send className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <p className="text-center text-xs text-[#8b949e] mt-2">
                    AI can make mistakes. Consider checking important information.
                </p>
            </form>
        </div>
    );
}
