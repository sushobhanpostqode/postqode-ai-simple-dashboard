import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Monitor, Moon, Sun, Type, Layout, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { appearanceSchema } from "@/lib/schemas";
import { toast } from "sonner";

export default function AppearanceForm() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { isSubmitting },
    } = useForm({
        resolver: zodResolver(appearanceSchema),
        defaultValues: {
            theme: "dark",
            fontSize: "medium",
            sidebarCollapsed: false,
            codeWrapping: true,
        },
    });

    const currentTheme = watch("theme");
    const currentFontSize = watch("fontSize");

    const onSubmit = async (data) => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        toast.success("Appearance settings saved!");
        console.log("Appearance data:", data);
    };

    const themes = [
        { id: "dark", label: "Dark", icon: Moon },
        { id: "light", label: "Light", icon: Sun },
        { id: "system", label: "System", icon: Monitor },
    ];

    const fontSizes = [
        { id: "small", label: "Small" },
        { id: "medium", label: "Medium" },
        { id: "large", label: "Large" },
    ];

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
                <h3 className="text-lg font-medium text-white">Appearance</h3>
                <p className="text-sm text-[#8b949e] mt-1">
                    Customize how the dashboard looks and feels
                </p>
            </div>

            <div className="space-y-6">
                {/* Theme Selection */}
                <div>
                    <label className="block text-sm text-[#8b949e] mb-3">
                        Theme
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                        {themes.map((theme) => (
                            <label
                                key={theme.id}
                                className={`flex flex-col items-center gap-2 p-4 rounded-lg border cursor-pointer transition-all ${currentTheme === theme.id
                                        ? "border-[#1f6feb] bg-[#1f6feb]/10"
                                        : "border-[#30363d] bg-[#0d1117] hover:border-[#484f58]"
                                    }`}
                            >
                                <input
                                    type="radio"
                                    value={theme.id}
                                    {...register("theme")}
                                    className="sr-only"
                                />
                                <theme.icon
                                    className={`h-5 w-5 ${currentTheme === theme.id
                                            ? "text-[#1f6feb]"
                                            : "text-[#8b949e]"
                                        }`}
                                />
                                <span
                                    className={`text-sm ${currentTheme === theme.id
                                            ? "text-white"
                                            : "text-[#8b949e]"
                                        }`}
                                >
                                    {theme.label}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Font Size */}
                <div>
                    <label className="block text-sm text-[#8b949e] mb-3">
                        Font Size
                    </label>
                    <div className="flex gap-2">
                        {fontSizes.map((size) => (
                            <label
                                key={size.id}
                                className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border cursor-pointer transition-all ${currentFontSize === size.id
                                        ? "border-[#1f6feb] bg-[#1f6feb]/10 text-white"
                                        : "border-[#30363d] bg-[#0d1117] text-[#8b949e] hover:border-[#484f58]"
                                    }`}
                            >
                                <input
                                    type="radio"
                                    value={size.id}
                                    {...register("fontSize")}
                                    className="sr-only"
                                />
                                <Type
                                    className={`h-4 w-4 ${size.id === "small"
                                            ? "scale-75"
                                            : size.id === "large"
                                                ? "scale-125"
                                                : ""
                                        }`}
                                />
                                <span className="text-sm">{size.label}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Toggles */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-[#0d1117] border border-[#30363d] rounded-lg">
                        <div className="flex items-center gap-3">
                            <Layout className="h-4 w-4 text-[#8b949e]" />
                            <div>
                                <p className="text-sm text-white">
                                    Collapse Sidebar
                                </p>
                                <p className="text-xs text-[#8b949e]">
                                    Keep sidebar minimized by default
                                </p>
                            </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                {...register("sidebarCollapsed")}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-[#30363d] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1f6feb]"></div>
                        </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-[#0d1117] border border-[#30363d] rounded-lg">
                        <div className="flex items-center gap-3">
                            <Code className="h-4 w-4 text-[#8b949e]" />
                            <div>
                                <p className="text-sm text-white">
                                    Code Wrapping
                                </p>
                                <p className="text-xs text-[#8b949e]">
                                    Wrap long lines in code blocks
                                </p>
                            </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                {...register("codeWrapping")}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-[#30363d] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1f6feb]"></div>
                        </label>
                    </div>
                </div>
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
