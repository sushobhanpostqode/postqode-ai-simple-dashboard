import { create } from "zustand";

export const useModelConfigStore = create((set, get) => ({
    // Configuration state
    selectedModel: "gpt-4",
    temperature: 0.7,
    maxTokens: 2048,
    topP: 0.9,

    // Available models
    availableModels: [
        { id: "gpt-4", name: "GPT-4", provider: "OpenAI" },
        { id: "gpt-3.5-turbo", name: "GPT-3.5 Turbo", provider: "OpenAI" },
        { id: "claude-3-opus", name: "Claude 3 Opus", provider: "Anthropic" },
        { id: "claude-3-sonnet", name: "Claude 3 Sonnet", provider: "Anthropic" },
        { id: "gemini-pro", name: "Gemini Pro", provider: "Google" },
    ],

    // Actions
    setSelectedModel: (model) => set({ selectedModel: model }),
    setTemperature: (temp) => set({ temperature: temp }),
    setMaxTokens: (tokens) => set({ maxTokens: tokens }),
    setTopP: (topP) => set({ topP: topP }),

    // Reset to defaults
    resetConfig: () =>
        set({
            selectedModel: "gpt-4",
            temperature: 0.7,
            maxTokens: 2048,
            topP: 0.9,
        }),

    // Get current config
    getConfig: () => {
        const state = get();
        return {
            model: state.selectedModel,
            temperature: state.temperature,
            maxTokens: state.maxTokens,
            topP: state.topP,
        };
    },
}));
