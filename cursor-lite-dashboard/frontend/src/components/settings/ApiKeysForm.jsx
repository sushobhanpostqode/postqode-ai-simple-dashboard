import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Key, Copy, Trash2, Plus, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { apiKeySchema } from "@/lib/schemas";
import { toast } from "sonner";

// Mock API keys data
const initialApiKeys = [
    {
        id: "key_1",
        name: "Production Key",
        key: "sk_live_51H7x...8f2a",
        createdAt: "2024-01-15",
        lastUsed: "2 hours ago",
    },
    {
        id: "key_2",
        name: "Development Key",
        key: "sk_test_9K3m...4b7c",
        createdAt: "2024-02-20",
        lastUsed: "5 minutes ago",
    },
];

export default function ApiKeysForm() {
    const [apiKeys, setApiKeys] = useState(initialApiKeys);
    const [showKey, setShowKey] = useState(null);
    const [isCreating, setIsCreating] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(apiKeySchema),
    });

    const onSubmit = async (data) => {
        await new Promise((resolve) => setTimeout(resolve, 500));

        const newKey = {
            id: `key_${Date.now()}`,
            name: data.name,
            key: `sk_live_${Math.random().toString(36).substring(2, 15)}...${Math.random().toString(36).substring(2, 6)}`,
            createdAt: new Date().toISOString().split("T")[0],
            lastUsed: "Never",
        };

        setApiKeys([...apiKeys, newKey]);
        setIsCreating(false);
        reset();
        toast.success("API key created successfully!");
    };

    const copyToClipboard = (key) => {
        navigator.clipboard.writeText(key);
        toast.success("API key copied to clipboard!");
    };

    const deleteKey = (id) => {
        setApiKeys(apiKeys.filter((k) => k.id !== id));
        toast.success("API key deleted!");
    };

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium text-white">API Keys</h3>
                <p className="text-sm text-[#8b949e] mt-1">
                    Manage your API keys for accessing the AI services
                </p>
            </div>

            {/* Create New Key Form */}
            {isCreating ? (
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="p-4 bg-[#0d1117] border border-[#30363d] rounded-lg space-y-4"
                >
                    <div>
                        <label className="block text-sm text-[#8b949e] mb-1.5">
                            Key Name
                        </label>
                        <input
                            {...register("name")}
                            className="w-full h-10 px-4 bg-[#161b22] border border-[#30363d] rounded-md text-sm text-white focus:outline-none focus:border-[#1f6feb]"
                            placeholder="e.g., Production Key"
                            autoFocus
                        />
                        {errors.name && (
                            <p className="text-xs text-red-400 mt-1">
                                {errors.name.message}
                            </p>
                        )}
                    </div>
                    <div className="flex gap-2">
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-[#1f6feb] hover:bg-[#388bfd] text-white"
                        >
                            <Plus className="h-4 w-4 mr-2" />
                            Create Key
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsCreating(false)}
                            className="border-[#30363d] bg-[#21262d] text-[#8b949e]"
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            ) : (
                <Button
                    onClick={() => setIsCreating(true)}
                    className="bg-[#1f6feb] hover:bg-[#388bfd] text-white"
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Key
                </Button>
            )}

            {/* API Keys List */}
            <div className="space-y-3">
                {apiKeys.map((apiKey) => (
                    <div
                        key={apiKey.id}
                        className="p-4 bg-[#0d1117] border border-[#30363d] rounded-lg"
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-[#21262d] rounded-lg">
                                    <Key className="h-4 w-4 text-[#1f6feb]" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-white">
                                        {apiKey.name}
                                    </h4>
                                    <p className="text-xs text-[#8b949e] mt-0.5">
                                        Created {apiKey.createdAt} • Last used{" "}
                                        {apiKey.lastUsed}
                                    </p>
                                    <div className="flex items-center gap-2 mt-2">
                                        <code className="text-xs text-[#8b949e] bg-[#161b22] px-2 py-1 rounded font-mono">
                                            {showKey === apiKey.id
                                                ? apiKey.key
                                                : apiKey.key.replace(
                                                    /.(?=\.{3})/g,
                                                    "•"
                                                )}
                                        </code>
                                        <button
                                            onClick={() =>
                                                setShowKey(
                                                    showKey === apiKey.id
                                                        ? null
                                                        : apiKey.id
                                                )
                                            }
                                            className="text-[#8b949e] hover:text-white"
                                        >
                                            {showKey === apiKey.id ? (
                                                <EyeOff className="h-3.5 w-3.5" />
                                            ) : (
                                                <Eye className="h-3.5 w-3.5" />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-1">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => copyToClipboard(apiKey.key)}
                                    className="h-8 w-8 text-[#8b949e] hover:text-white"
                                >
                                    <Copy className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => deleteKey(apiKey.id)}
                                    className="h-8 w-8 text-[#8b949e] hover:text-red-400"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {apiKeys.length === 0 && (
                <div className="text-center py-8 text-[#8b949e]">
                    <Key className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>No API keys created yet</p>
                </div>
            )}
        </div>
    );
}
