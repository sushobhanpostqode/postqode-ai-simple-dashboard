import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";
import RightPanel from "./RightPanel";

export default function MainLayout() {
    return (
        <div className="flex h-screen bg-[#010409] text-white overflow-hidden">
            {/* Left Sidebar - 240px */}
            <Sidebar />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Top Navbar */}
                <TopNavbar />

                {/* Content Area */}
                <div className="flex-1 flex overflow-hidden">
                    {/* Center Panel - Dynamic Content */}
                    <main className="flex-1 overflow-y-auto bg-[#0d1117] p-6">
                        <Outlet />
                    </main>

                    {/* Right Panel - 300px */}
                    <RightPanel />
                </div>
            </div>
        </div>
    );
}
