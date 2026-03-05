import React from "react";

export default function ChartCard({ title, subtitle, children, action }) {
    return (
        <div className="bg-[#161b22] border border-[#30363d] rounded-xl overflow-hidden hover:border-[#484f58] transition-all">
            <div className="px-5 py-4 border-b border-[#30363d] flex items-center justify-between">
                <div>
                    <h3 className="text-sm font-semibold text-white">{title}</h3>
                    {subtitle && (
                        <p className="text-xs text-[#8b949e] mt-0.5">{subtitle}</p>
                    )}
                </div>
                {action && <div>{action}</div>}
            </div>
            <div className="p-5">{children}</div>
        </div>
    );
}
