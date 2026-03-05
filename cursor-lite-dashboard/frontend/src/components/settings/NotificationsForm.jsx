import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Mail,
    Bell,
    Newspaper,
    Sparkles,
    ShieldAlert,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { notificationsSchema } from "@/lib/schemas";
import { toast } from "sonner";

export default function NotificationsForm() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { isSubmitting },
    } = useForm({
        resolver: zodResolver(notificationsSchema),
        defaultValues: {
            emailNotifications: true,
            pushNotifications: true,
            weeklyDigest: true,
            newFeatures: true,
            securityAlerts: true,
        },
    });

    const onSubmit = async (data) => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        toast.success("Notification preferences saved!");
        console.log("Notifications data:", data);
    };

    const notificationOptions = [
        {
            id: "emailNotifications",
            label: "Email Notifications",
            description: "Receive updates via email",
            icon: Mail,
        },
        {
            id: "pushNotifications",
            label: "Push Notifications",
            description: "Browser push notifications",
            icon: Bell,
        },
        {
            id: "weeklyDigest",
            label: "Weekly Digest",
            description: "Summary of your activity",
            icon: Newspaper,
        },
        {
            id: "newFeatures",
            label: "New Features",
            description: "Get notified about new features",
            icon: Sparkles,
        },
        {
            id: "securityAlerts",
            label: "Security Alerts",
            description: "Important security notifications",
            icon: ShieldAlert,
        },
    ];

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
                <h3 className="text-lg font-medium text-white">
                    Notifications
                </h3>
                <p className="text-sm text-[#8b949e] mt-1">
                    Manage your notification preferences
                </p>
            </div>

            <div className="space-y-4">
                {notificationOptions.map((option) => (
                    <div
                        key={option.id}
                        className="flex items-center justify-between p-4 bg-[#0d1117] border border-[#30363d] rounded-lg"
                    >
                        <div className="flex items-center gap-3">
                            <option.icon className="h-4 w-4 text-[#8b949e]" />
                            <div>
                                <p className="text-sm text-white">
                                    {option.label}
                                </p>
                                <p className="text-xs text-[#8b949e]">
                                    {option.description}
                                </p>
                            </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                {...register(option.id)}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-[#30363d] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1f6feb]"></div>
                        </label>
                    </div>
                ))}
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-[#30363d]">
                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#1f6feb] hover:bg-[#388bfd] text-white"
                >
                    {isSubmitting ? "Saving..." : "Save Changes"}
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    className="border-[#30363d] bg-[#21262d] text-[#8b949e] hover:text-white"
                >
                    Reset to Default
                </Button>
            </div>
        </form>
    );
}
