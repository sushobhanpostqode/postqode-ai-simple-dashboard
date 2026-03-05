import React, { useState } from "react";
import {
    User,
    Bell,
    Shield,
    Key,
    Palette,
    Globe,
} from "lucide-react";
import { Toaster } from "sonner";
import ProfileForm from "@/components/settings/ProfileForm";
import ApiKeysForm from "@/components/settings/ApiKeysForm";
import AppearanceForm from "@/components/settings/AppearanceForm";
import NotificationsForm from "@/components/settings/NotificationsForm";

const settingsSections = [
    {
        id: "profile",
        name: "Profile",
        icon: User,
        description: "Manage your account information",
    },
    {
        id: "notifications",
        name: "Notifications",
        icon: Bell,
        description: "Configure notification preferences",
    },
    {
        id: "security",
        name: "Security",
        icon: Shield,
        description: "Password and authentication settings",
    },
    {
        id: "api",
        name: "API Keys",
        icon: Key,
        description: "Manage your API access keys",
    },
    {
        id: "appearance",
        name: "Appearance",
        icon: Palette,
        description: "Customize the interface",
    },
    {
        id: "language",
        name: "Language",
        icon: Globe,
        description: "Language and region settings",
    },
];

export default function Settings() {
    const [activeSection, setActiveSection] = useState("profile");

    return (
        <div className="space-y-6">
            <Toaster position="top-right" theme="dark" />

            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-white">Settings</h1>
                <p className="text-[#8b949e] mt-1">
                    Manage your preferences and account
                </p>
            </div>

            <div className="flex gap-6">
                {/* Settings Navigation */}
                <div className="w-64 space-y-1">
                    {settingsSections.map((section) => (
                        <button
                            key={section.id}
                            onClick={() => setActiveSection(section.id)}
                            className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${activeSection === section.id
                                ? "bg-[#1f6feb] text-white"
                                : "text-[#8b949e] hover:bg-[#21262d] hover:text-white"
                                }`}
                        >
                            <section.icon className="h-4 w-4" />
                            {section.name}
                        </button>
                    ))}
                </div>

                {/* Settings Content */}
                <div className="flex-1 bg-[#161b22] border border-[#30363d] rounded-lg p-6">
                    {activeSection === "profile" && <ProfileForm />}
                    {activeSection === "api" && <ApiKeysForm />}
                    {activeSection === "appearance" && <AppearanceForm />}
                    {activeSection === "notifications" && <NotificationsForm />}

                    {activeSection === "security" && (
                        <div className="text-center py-12">
                            <div className="h-12 w-12 rounded-full bg-[#21262d] flex items-center justify-center mx-auto mb-4">
                                <Shield className="h-6 w-6 text-[#8b949e]" />
                            </div>
                            <h3 className="text-lg font-medium text-white">
                                Security
                            </h3>
                            <p className="text-sm text-[#8b949e] mt-1">
                                Password and authentication settings
                            </p>
                        </div>
                    )}

                    {activeSection === "language" && (
                        <div className="text-center py-12">
                            <div className="h-12 w-12 rounded-full bg-[#21262d] flex items-center justify-center mx-auto mb-4">
                                <Globe className="h-6 w-6 text-[#8b949e]" />
                            </div>
                            <h3 className="text-lg font-medium text-white">
                                Language
                            </h3>
                            <p className="text-sm text-[#8b949e] mt-1">
                                Language and region settings
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
