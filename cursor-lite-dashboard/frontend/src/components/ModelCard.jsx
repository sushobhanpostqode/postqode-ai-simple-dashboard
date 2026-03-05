import React from "react";
import { BrainCircuit, Zap, Check, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ModelCard({
    model,
    isSelected,
    onSelect,
    onToggle,
}) {
    const getLatencyColor = (latency) => {
        if (latency < 200) return "text-emerald-400";
        if (latency < 500) return "text-yellow-400";
        return "text-red-400";
    };

    const getLatencyBg = (latency) => {
        if (latency < 200) return "bg-emerald-400/10";
        if (latency < 500) return "bg-yellow-400/10";
        return "bg-red-400/10";
    };

    return (
        <div
            className={cn(
                "relative bg-[#161b22] border rounded-xl p-5 transition-all hover:border-[#484f58]",
                isSelected
                    ? "border-[#1f6feb] ring-1 ring-[#1f6feb]/20"
                    : "border-[#30363d]",
                !model.enabled && "opacity-60"
            )}
        >
            {/* Checkbox */}
            <div className="absolute top-4 right-4">
                <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={(e) => onSelect(model.id, e.target.checked)}
                    className="h-4 w-4 rounded border-[#30363d] bg-[#0d1117] text-[#1f6feb] focus:ring-[#1f6feb] focus:ring-offset-0"
                />
            </div>

            <div className="flex items-start gap-4">
                {/* Icon */}
                <div
                    className={cn(
                        "h-12 w-12 rounded-xl flex items-center justify-center flex-shrink-0",
                        model.enabled
                            ? "bg-gradient-to-br from-blue-500 to-purple-600"
                            : "bg-[#21262d] border border-[#30363d]"
                    )}
                >
                    <BrainCircuit
                        className={cn(
                            "h-6 w-6",
                            model.enabled ? "text-white" : "text-[#8b949e]"
                        )}
                    />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0 pr-8">
                    <div className="flex items-center gap-2">
                        <h3 className="text-base font-semibold text-white">
                            {model.name}
                        </h3>
                        {model.enabled ? (
                            <span className="flex items-center gap-1 text-xs text-emerald-400">
                                <Check className="h-3 w-3" />
                                Enabled
                            </span>
                        ) : (
                            <span className="flex items-center gap-1 text-xs text-[#8b949e]">
                                <AlertCircle className="h-3 w-3" />
                                Disabled
                            </span>
                        )}
                    </div>
                    <p className="text-sm text-[#8b949e] mt-0.5">
                        {model.provider}
                    </p>

                    {/* Latency Indicator */}
                    <div className="flex items-center gap-2 mt-3">
                        <div
                            className={cn(
                                "flex items-center gap-1.5 px-2 py-1 rounded-full",
                                getLatencyBg(model.latency)
                            )}
                        >
                            <Zap
                                className={cn(
                                    "h-3 w-3",
                                    getLatencyColor(model.latency)
                                )}
                            />
                            <span
                                className={cn(
                                    "text-xs font-medium",
                                    getLatencyColor(model.latency)
                                )}
                            >
                                {model.latency}ms
                            </span>
                        </div>
                        <span className="text-xs text-[#8b949e]">
                            avg latency
                        </span>
                    </div>
                </div>
            </div>

            {/* Toggle Button */}
            <div className="mt-4 pt-4 border-t border-[#30363d]">
                <button
                    onClick={() => onToggle(model.id)}
                    className={cn(
                        "w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors",
                        model.enabled
                            ? "bg-red-500/10 text-red-400 hover:bg-red-500/20"
                            : "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                    )}
                >
                    {model.enabled ? "Disable Model" : "Enable Model"}
                </button>
            </div>
        </div>
    );
}
