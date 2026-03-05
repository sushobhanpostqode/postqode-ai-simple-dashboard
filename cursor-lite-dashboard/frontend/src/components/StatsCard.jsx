import React from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

export default function StatsCard({
    title,
    value,
    change,
    changeType = "neutral",
    icon: Icon,
    trend = null,
}) {
    const getTrendIcon = () => {
        if (trend === "up") return <TrendingUp className="h-4 w-4" />;
        if (trend === "down") return <TrendingDown className="h-4 w-4" />;
        return <Minus className="h-4 w-4" />;
    };

    const getTrendColor = () => {
        if (trend === "up") return "text-emerald-400";
        if (trend === "down") return "text-red-400";
        return "text-[#8b949e]";
    };

    return (
        <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-5 hover:border-[#484f58] transition-all group">
            <div className="flex items-start justify-between">
                <div className="p-2.5 bg-[#21262d] rounded-lg group-hover:bg-[#1f6feb]/10 transition-colors">
                    {Icon && <Icon className="h-5 w-5 text-[#1f6feb]" />}
                </div>
                {change && (
                    <div className={cn("flex items-center gap-1 text-xs font-medium", getTrendColor())}>
                        {getTrendIcon()}
                        <span>{change}</span>
                    </div>
                )}
            </div>
            <div className="mt-4">
                <p className="text-3xl font-bold text-white tracking-tight">
                    {value}
                </p>
                <p className="text-sm text-[#8b949e] mt-1">{title}</p>
            </div>
        </div>
    );
}
