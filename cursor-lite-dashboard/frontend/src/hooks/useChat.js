import { useMutation } from "@tanstack/react-query";
import { sendPrompt } from "@/services/mockApi";

export const useSendPrompt = () => {
    return useMutation({
        mutationFn: ({ prompt, config }) => sendPrompt(prompt, config),
    });
};
