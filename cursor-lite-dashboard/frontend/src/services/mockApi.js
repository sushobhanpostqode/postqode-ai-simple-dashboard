// Mock data
const mockModels = [
    {
        id: "gpt-4",
        name: "GPT-4",
        provider: "OpenAI",
        latency: 245,
        enabled: true,
    },
    {
        id: "claude",
        name: "Claude 3",
        provider: "Anthropic",
        latency: 189,
        enabled: true,
    },
    {
        id: "gemini",
        name: "Gemini Pro",
        provider: "Google",
        latency: 312,
        enabled: false,
    },
    {
        id: "llama",
        name: "Llama 2",
        provider: "Meta",
        latency: 156,
        enabled: true,
    },
    {
        id: "mistral",
        name: "Mistral",
        provider: "Mistral AI",
        latency: 198,
        enabled: false,
    },
];

const mockResponses = [
    `I can help you with that! Here's an example:

\`\`\`javascript
function greet(name) {
    return \`Hello, \${name}!\`;
}

console.log(greet("World")); // Output: Hello, World!
\`\`\`

This is a simple greeting function that takes a name parameter and returns a greeting message.`,

    `That's a great question! Let me break it down:

**Key Points:**
1. React hooks allow you to use state and lifecycle features in functional components
2. The most commonly used hooks are \`useState\` and \`useEffect\`
3. Hooks should only be called at the top level of your component

Would you like me to elaborate on any specific hook?`,

    `Here's how you can optimize that SQL query:

\`\`\`sql
-- Instead of:
SELECT * FROM users WHERE status = 'active';

-- Use:
SELECT id, name, email 
FROM users 
WHERE status = 'active' 
AND created_at > '2024-01-01';
\`\`\`

**Optimization tips:**
- Select only needed columns
- Add appropriate indexes
- Use WHERE clauses to filter early`,

    `I understand you'd like help with that. Based on your request, here are some suggestions:

1. **Approach A**: Quick and simple solution
2. **Approach B**: More robust but requires more setup
3. **Approach C**: Best for long-term scalability

Which approach interests you most?`,
];

const mockDashboardStats = {
    stats: {
        totalRequests: 1745,
        activeModels: 4,
        avgResponseTime: 245,
        errors: 12,
    },
    changes: {
        totalRequests: "+12.5%",
        activeModels: "+1",
        avgResponseTime: "-8.2%",
        errors: "+2.1%",
    },
    recentActivity: [
        { id: 1, action: "New chat started", model: "GPT-4", time: "2 min ago" },
        { id: 2, action: "Model optimized", model: "Claude 3", time: "15 min ago" },
        { id: 3, action: "Settings updated", model: "-", time: "1 hour ago" },
        { id: 4, action: "New chat started", model: "GPT-3.5", time: "2 hours ago" },
    ],
};

// Simulate network delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Get all models
export const getModels = async () => {
    await delay(500); // Simulate 500ms network delay
    return [...mockModels];
};

// Send prompt and get response
export const sendPrompt = async (prompt, config = {}) => {
    await delay(1000 + Math.random() * 1000); // Simulate 1-2s delay

    const randomResponse =
        mockResponses[Math.floor(Math.random() * mockResponses.length)];

    return {
        id: Date.now().toString(),
        content: randomResponse,
        prompt: prompt,
        timestamp: new Date().toISOString(),
        model: config.model || "gpt-4",
        usage: {
            prompt_tokens: prompt.length,
            completion_tokens: randomResponse.length,
            total_tokens: prompt.length + randomResponse.length,
        },
    };
};

// Get dashboard statistics
export const getDashboardStats = async () => {
    await delay(800); // Simulate 800ms network delay
    return { ...mockDashboardStats };
};

// Health check
export const healthCheck = async () => {
    await delay(200);
    return { status: "ok", timestamp: new Date().toISOString() };
};
