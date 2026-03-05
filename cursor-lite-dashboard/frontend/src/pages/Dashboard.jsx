import React from "react";
import {
    Activity,
    Cpu,
    Clock,
    AlertCircle,
    Calendar,
    Loader2,
} from "lucide-react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from "recharts";
import StatsCard from "@/components/StatsCard";
import ChartCard from "@/components/ChartCard";
import { Button } from "@/components/ui/button";
import { useDashboardStats } from "@/hooks/useDashboardStats";

// Mock data for requests over time (static for charts)
const requestsData = [
    { time: "00:00", requests: 120, success: 115 },
    { time: "04:00", requests: 85, success: 82 },
    { time: "08:00", requests: 250, success: 245 },
    { time: "12:00", requests: 380, success: 375 },
    { time: "16:00", requests: 420, success: 415 },
    { time: "20:00", requests: 310, success: 305 },
    { time: "23:59", requests: 180, success: 178 },
];

// Mock data for model usage
const modelUsageData = [
    { name: "GPT-4", value: 45, color: "#1f6feb" },
    { name: "GPT-3.5", value: 30, color: "#8957e5" },
    { name: "Claude 3", value: 15, color: "#2ea043" },
    { name: "Gemini", value: 10, color: "#d29922" },
];

export default function Dashboard() {
    const { data: statsData, isLoading, error } = useDashboardStats();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-full">
                <Loader2 className="h-8 w-8 animate-spin text-[#1f6feb]" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-red-400">
                <AlertCircle className="h-8 w-8 mb-2" />
                <p>Failed to load dashboard data</p>
            </div>
        );
    }

    const { stats, changes, recentActivity } = statsData || {};

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white">Dashboard</h1>
                    <p className="text-[#8b949e] mt-1">
                        Monitor your AI assistant performance
                    </p>
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    className="border-[#30363d] bg-[#21262d] text-[#8b949e] hover:text-white"
                >
                    <Calendar className="h-4 w-4 mr-2" />
                    Last 24 hours
                </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatsCard
                    title="Total Requests"
                    value={stats?.totalRequests?.toLocaleString() || "0"}
                    change={changes?.totalRequests}
                    trend="up"
                    icon={Activity}
                />
                <StatsCard
                    title="Active Models"
                    value={stats?.activeModels?.toString() || "0"}
                    change={changes?.activeModels}
                    trend="up"
                    icon={Cpu}
                />
                <StatsCard
                    title="Avg Response Time"
                    value={`${stats?.avgResponseTime || 0}ms`}
                    change={changes?.avgResponseTime}
                    trend="up"
                    icon={Clock}
                />
                <StatsCard
                    title="Errors"
                    value={stats?.errors?.toString() || "0"}
                    change={changes?.errors}
                    trend="down"
                    icon={AlertCircle}
                />
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Requests Over Time Chart */}
                <ChartCard
                    title="Requests Over Time"
                    subtitle="Total API requests in the last 24 hours"
                    className="lg:col-span-2"
                >
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={requestsData}>
                                <defs>
                                    <linearGradient
                                        id="colorRequests"
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="1"
                                    >
                                        <stop
                                            offset="5%"
                                            stopColor="#1f6feb"
                                            stopOpacity={0.3}
                                        />
                                        <stop
                                            offset="95%"
                                            stopColor="#1f6feb"
                                            stopOpacity={0}
                                        />
                                    </linearGradient>
                                    <linearGradient
                                        id="colorSuccess"
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="1"
                                    >
                                        <stop
                                            offset="5%"
                                            stopColor="#2ea043"
                                            stopOpacity={0.3}
                                        />
                                        <stop
                                            offset="95%"
                                            stopColor="#2ea043"
                                            stopOpacity={0}
                                        />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    stroke="#30363d"
                                    vertical={false}
                                />
                                <XAxis
                                    dataKey="time"
                                    stroke="#8b949e"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <YAxis
                                    stroke="#8b949e"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "#161b22",
                                        border: "1px solid #30363d",
                                        borderRadius: "8px",
                                        color: "#fff",
                                    }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="requests"
                                    stroke="#1f6feb"
                                    strokeWidth={2}
                                    fillOpacity={1}
                                    fill="url(#colorRequests)"
                                />
                                <Area
                                    type="monotone"
                                    dataKey="success"
                                    stroke="#2ea043"
                                    strokeWidth={2}
                                    fillOpacity={1}
                                    fill="url(#colorSuccess)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex items-center justify-center gap-6 mt-4">
                        <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-[#1f6feb]" />
                            <span className="text-xs text-[#8b949e]">
                                Total Requests
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-[#2ea043]" />
                            <span className="text-xs text-[#8b949e]">
                                Successful
                            </span>
                        </div>
                    </div>
                </ChartCard>

                {/* Model Usage Distribution */}
                <ChartCard title="Model Usage" subtitle="Distribution by AI model">
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={modelUsageData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={90}
                                    paddingAngle={2}
                                    dataKey="value"
                                >
                                    {modelUsageData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={entry.color}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "#161b22",
                                        border: "1px solid #30363d",
                                        borderRadius: "8px",
                                        color: "#fff",
                                    }}
                                    formatter={(value) => [`${value}%`, "Usage"]}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="space-y-2 mt-2">
                        {modelUsageData.map((item) => (
                            <div
                                key={item.name}
                                className="flex items-center justify-between"
                            >
                                <div className="flex items-center gap-2">
                                    <div
                                        className="h-2 w-2 rounded-full"
                                        style={{ backgroundColor: item.color }}
                                    />
                                    <span className="text-xs text-[#8b949e]">
                                        {item.name}
                                    </span>
                                </div>
                                <span className="text-xs text-white font-medium">
                                    {item.value}%
                                </span>
                            </div>
                        ))}
                    </div>
                </ChartCard>
            </div>

            {/* Recent Activity Summary */}
            <ChartCard
                title="Recent Activity"
                subtitle="Latest system events"
                action={
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-[#8b949e] hover:text-white"
                    >
                        View All
                    </Button>
                }
            >
                <div className="space-y-3">
                    {recentActivity?.map((activity) => (
                        <div
                            key={activity.id}
                            className="flex items-center justify-between py-2 border-b border-[#21262d] last:border-0"
                        >
                            <div className="flex items-center gap-3">
                                <div
                                    className={`h-2 w-2 rounded-full ${activity.type === "success"
                                            ? "bg-emerald-400"
                                            : activity.type === "warning"
                                                ? "bg-yellow-400"
                                                : "bg-blue-400"
                                        }`}
                                />
                                <span className="text-sm text-white">
                                    {activity.action}
                                </span>
                            </div>
                            <span className="text-xs text-[#8b949e]">
                                {activity.time}
                            </span>
                        </div>
                    ))}
                </div>
            </ChartCard>
        </div>
    );
}
