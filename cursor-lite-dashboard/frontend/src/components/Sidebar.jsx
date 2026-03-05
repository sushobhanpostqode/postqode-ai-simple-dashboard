import React from "react";
import { NavLink } from "react-router-dom";
import {
    LayoutDashboard,
    MessageSquare,
    BrainCircuit,
    Settings,
    Command,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navItems = [
    {
        name: "Dashboard",
        path: "/",
        icon: LayoutDashboard,
    },
    {
        name: "Chat",
        path: "/chat",
        icon: MessageSquare,
    },
    {
        name: "Models",
        path: "/models",
        icon: BrainCircuit,
    },
    {
        name: "Settings",
        path: "/settings",
        icon: Settings,
    },
];

export default function Sidebar() {
    return (
        <aside className="w-[240px] flex-shrink-0 bg-[#0d1117] border-r border-[#30363d] flex flex-col">
            {/* Logo */}
            <div className="h-14 flex items-center px-4 border-b border-[#30363d]">
                <div className="flex items-center gap-2 text-white">
                    <Command className="h-5 w-5" />
                    <span className="font-semibold">Cursor Lite</span>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-3 space-y-1">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            cn(
                                "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                                isActive
                                    ? "bg-[#1f6feb] text-white"
                                    : "text-[#8b949e] hover:bg-[#21262d] hover:text-white"
                            )
                        }
                    >
                        <item.icon className="h-4 w-4" />
                        {item.name}
                    </NavLink>
                ))}
            </nav>

            {/* User Profile */}
            <div className="p-3 border-t border-[#30363d]">
                <Button
                    variant="ghost"
                    className="w-full justify-start gap-3 text-[#8b949e] hover:text-white hover:bg-[#21262d]"
                >
                    <div className="h-6 w-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600" />
                    <span className="text-sm">User</span>
                </Button>
            </div>
        </aside>
    );
}
