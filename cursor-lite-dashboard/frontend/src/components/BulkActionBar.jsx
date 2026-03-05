import React from "react";
import { Power, PowerOff, CheckSquare, Square } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BulkActionBar({
    selectedCount,
    totalCount,
    onSelectAll,
    onDeselectAll,
    onBulkEnable,
    onBulkDisable,
    isAllSelected,
}) {
    if (selectedCount === 0) {
        return (
            <div className="flex items-center justify-between bg-[#161b22] border border-[#30363d] rounded-xl p-4">
                <div className="flex items-center gap-3">
                    <button
                        onClick={onSelectAll}
                        className="flex items-center gap-2 text-sm text-[#8b949e] hover:text-white transition-colors"
                    >
                        <Square className="h-4 w-4" />
                        Select all models
                    </button>
                </div>
                <span className="text-sm text-[#8b949e]">
                    {totalCount} models total
                </span>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-between bg-[#1f6feb]/5 border border-[#1f6feb]/20 rounded-xl p-4">
            <div className="flex items-center gap-4">
                <button
                    onClick={onDeselectAll}
                    className="flex items-center gap-2 text-sm text-white hover:text-[#8b949e] transition-colors"
                >
                    <CheckSquare className="h-4 w-4" />
                    <span className="font-medium">
                        {selectedCount} selected
                    </span>
                </button>
            </div>

            <div className="flex items-center gap-2">
                <Button
                    onClick={onBulkEnable}
                    variant="outline"
                    size="sm"
                    className="border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 hover:text-emerald-300"
                >
                    <Power className="h-4 w-4 mr-2" />
                    Enable All
                </Button>
                <Button
                    onClick={onBulkDisable}
                    variant="outline"
                    size="sm"
                    className="border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300"
                >
                    <PowerOff className="h-4 w-4 mr-2" />
                    Disable All
                </Button>
            </div>
        </div>
    );
}
