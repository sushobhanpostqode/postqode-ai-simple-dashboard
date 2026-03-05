import React from "react";
import { Settings2, RotateCcw, Cpu, Thermometer, Hash, Percent } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectItem } from "@/components/ui/select";
import { useModelConfigStore } from "@/store/modelConfigStore";

// Slider component
const SliderControl = ({ label, value, min, max, step, onChange, icon: Icon, description }) => (
    <div className="space-y-3">
        <div className="flex items-center justify-between">
            <label className="text-xs font-medium text-[#8b949e] uppercase flex items-center gap-2">
                <Icon className="h-3.5 w-3.5" />
                {label}
            </label>
            <span className="text-sm font-mono text-white bg-[#21262d] px-2 py-0.5 rounded">
                {value}
            </span>
        </div>
        <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => onChange(parseFloat(e.target.value))}
            className="w-full h-1.5 bg-[#30363d] rounded-full appearance-none cursor-pointer accent-[#1f6feb] hover:accent-[#388bfd] transition-all"
        />
        <div className="flex justify-between text-xs text-[#8b949e]">
            <span>{min}</span>
            <span>{description}</span>
            <span>{max}</span>
        </div>
    </div>
);

// Number input component
const NumberInput = ({ label, value, min, max, onChange, icon: Icon }) => (
    <div className="space-y-2">
        <label className="text-xs font-medium text-[#8b949e] uppercase flex items-center gap-2">
            <Icon className="h-3.5 w-3.5" />
            {label}
        </label>
        <div className="relative">
            <input
                type="number"
                min={min}
                max={max}
                value={value}
                onChange={(e) => {
                    const val = parseInt(e.target.value) || min;
                    onChange(Math.max(min, Math.min(max, val)));
                }}
                className="w-full h-9 px-3 bg-[#0d1117] border border-[#30363d] rounded-md text-sm text-white placeholder:text-[#8b949e] focus:outline-none focus:border-[#1f6feb] focus:ring-1 focus:ring-[#1f6feb]/20 transition-all"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8b949e]">
                tokens
            </div>
        </div>
    </div>
);

export default function RightPanel() {
    const {
        selectedModel,
        temperature,
        maxTokens,
        topP,
        availableModels,
        setSelectedModel,
        setTemperature,
        setMaxTokens,
        setTopP,
        resetConfig,
    } = useModelConfigStore();

    return (
        <aside className="w-[300px] flex-shrink-0 bg-[#0d1117] border-l border-[#30363d] flex flex-col h-full">
            {/* Header */}
            <div className="h-14 flex items-center justify-between px-4 border-b border-[#30363d]">
                <div className="flex items-center gap-2 text-white">
                    <Settings2 className="h-4 w-4" />
                    <span className="font-medium text-sm">Model Config</span>
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={resetConfig}
                    className="h-7 w-7 text-[#8b949e] hover:text-white hover:bg-[#21262d]"
                    title="Reset to defaults"
                >
                    <RotateCcw className="h-3.5 w-3.5" />
                </Button>
            </div>

            {/* Configuration Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {/* Model Selector */}
                <div className="space-y-2">
                    <label className="text-xs font-medium text-[#8b949e] uppercase flex items-center gap-2">
                        <Cpu className="h-3.5 w-3.5" />
                        Model
                    </label>
                    <Select
                        value={selectedModel}
                        onChange={setSelectedModel}
                        placeholder="Select a model"
                    >
                        {availableModels.map((model) => (
                            <SelectItem key={model.id} value={model.id}>
                                <div>
                                    <div className="font-medium">{model.name}</div>
                                    <div className="text-xs text-[#8b949e]">{model.provider}</div>
                                </div>
                            </SelectItem>
                        ))}
                    </Select>
                </div>

                {/* Divider */}
                <div className="h-px bg-[#30363d]" />

                {/* Temperature Slider */}
                <SliderControl
                    label="Temperature"
                    value={temperature.toFixed(1)}
                    min={0}
                    max={2}
                    step={0.1}
                    onChange={setTemperature}
                    icon={Thermometer}
                    description="Creativity"
                />

                {/* Divider */}
                <div className="h-px bg-[#30363d]" />

                {/* Max Tokens Input */}
                <NumberInput
                    label="Max Tokens"
                    value={maxTokens}
                    min={256}
                    max={4096}
                    onChange={setMaxTokens}
                    icon={Hash}
                />

                {/* Divider */}
                <div className="h-px bg-[#30363d]" />

                {/* Top-p Slider */}
                <SliderControl
                    label="Top P"
                    value={topP.toFixed(1)}
                    min={0}
                    max={1}
                    step={0.1}
                    onChange={setTopP}
                    icon={Percent}
                    description="Diversity"
                />

                {/* Info Section */}
                <div className="mt-6 p-3 bg-[#21262d]/50 border border-[#30363d] rounded-lg">
                    <h4 className="text-xs font-medium text-white mb-2">Current Settings</h4>
                    <div className="space-y-1.5 text-xs">
                        <div className="flex justify-between">
                            <span className="text-[#8b949e]">Model:</span>
                            <span className="text-white font-mono">
                                {availableModels.find(m => m.id === selectedModel)?.name}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-[#8b949e]">Temperature:</span>
                            <span className="text-white font-mono">{temperature}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-[#8b949e]">Max Tokens:</span>
                            <span className="text-white font-mono">{maxTokens}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-[#8b949e]">Top P:</span>
                            <span className="text-white font-mono">{topP}</span>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
}
