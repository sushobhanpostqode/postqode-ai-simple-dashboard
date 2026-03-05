import { z } from "zod";

export const profileSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    bio: z.string().max(500, "Bio must be less than 500 characters").optional(),
    company: z.string().optional(),
    location: z.string().optional(),
    website: z.string().url("Invalid URL").optional().or(z.literal("")),
});

export const apiKeySchema = z.object({
    name: z.string().min(1, "Name is required"),
});

export const appearanceSchema = z.object({
    theme: z.enum(["dark", "light", "system"]),
    fontSize: z.enum(["small", "medium", "large"]),
    sidebarCollapsed: z.boolean(),
    codeWrapping: z.boolean(),
});

export const notificationsSchema = z.object({
    emailNotifications: z.boolean(),
    pushNotifications: z.boolean(),
    weeklyDigest: z.boolean(),
    newFeatures: z.boolean(),
    securityAlerts: z.boolean(),
});
