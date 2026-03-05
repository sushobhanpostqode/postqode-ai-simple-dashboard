import React, { useState } from "react";
import { Plus, Search, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import ModelList from "@/components/ModelList";
import BulkActionBar from "@/components/BulkActionBar";
import { useModels } from "@/hooks/useModels";

export default function Models() {
    const { data: models = [], isLoading, error } = useModels();
    const [selectedModels, setSelectedModels] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    const filteredModels = models.filter(
        (model) =>
            model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            model.provider.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSelectModel = (modelId, isSelected) => {
        if (isSelected) {
            setSelectedModels((prev) => [...prev, modelId]);
        } else {
            setSelectedModels((prev) => prev.filter((id) => id !== modelId));
        }
    };

    const handleSelectAll = () => {
        setSelectedModels(filteredModels.map((m) => m.id));
    };

    const handleDeselectAll = () => {
        setSelectedModels([]);
    };

    const handleToggleModel = (modelId) => {
        // In a real app, this would trigger an API mutation
        console.log("Toggle model:", modelId);
    };

    const handleBulkEnable = () => {
        console.log("Bulk enable:", selectedModels);
        setSelectedModels([]);
    };

    const handleBulkDisable = () => {
        console.log("Bulk disable:", selectedModels);
        setSelectedModels([]);
    };

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
                <p>Failed to load models</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white">Models</h1>
                    <p className="text-[#8b949e] mt-1">
                        Manage and configure AI models
                    </p>
                </div>
                <Button className="bg-[#1f6feb] hover:bg-[#388bfd] text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Model
                </Button>
            </div>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8b949e]" />
                <input
                    type="text"
                    placeholder="Search models..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-10 pl-10 pr-4 bg-[#161b22] border border-[#30363d] rounded-lg text-sm text-white placeholder:text-[#8b949e] focus:outline-none focus:border-[#1f6feb]"
                />
            </div>

            {/* Bulk Actions */}
            <BulkActionBar
                selectedCount={selectedModels.length}
                totalCount={filteredModels.length}
                onSelectAll={handleSelectAll}
                onDeselectAll={handleDeselectAll}
                onBulkEnable={handleBulkEnable}
                onBulkDisable={handleBulkDisable}
                isAllSelected={selectedModels.length === filteredModels.length}
            />

            {/* Model Grid */}
            <ModelList
                models={filteredModels}
                selectedModels={selectedModels}
                onSelectModel={handleSelectModel}
                onToggleModel={handleToggleModel}
            />
        </div>
    );
}
