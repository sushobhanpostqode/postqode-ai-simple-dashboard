import React from "react";
import { Search, Bell, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TopNavbar() {
    return (
        <header className="h-14 bg-[#0d1117] border-b border-[#30363d] flex items-center justify-between px-4">
            {/* Search */}
            <div className="flex items-center gap-3 flex-1 max-w-md">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8b949e]" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full h-9 pl-9 pr-4 bg-[#21262d] border border-[#30363d] rounded-md text-sm text-white placeholder:text-[#8b949e] focus:outline-none focus:border-[#1f6feb]"
                    />
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
                <Button
                    size="sm"
                    className="bg-[#1f6feb] hover:bg-[#388bfd] text-white gap-2"
                >
                    <Plus className="h-4 w-4" />
                    New Chat
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-[#8b949e] hover:text-white hover:bg-[#21262d]"
                >
                    <Bell className="h-4 w-4" />
                </Button>
            </div>
        </header>
    );
}
