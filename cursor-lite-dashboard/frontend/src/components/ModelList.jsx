import React from "react";
import ModelCard from "./ModelCard";

export default function ModelList({
    models,
    selectedModels,
    onSelectModel,
    onToggleModel,
}) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {models.map((model) => (
                <ModelCard
                    key={model.id}
                    model={model}
                    isSelected={selectedModels.includes(model.id)}
                    onSelect={onSelectModel}
                    onToggle={onToggleModel}
                />
            ))}
        </div>
    );
}
