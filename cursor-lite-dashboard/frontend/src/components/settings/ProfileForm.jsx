import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, Mail, Building, MapPin, Link, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { profileSchema } from "@/lib/schemas";
import { toast } from "sonner";

export default function ProfileForm() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: "John Doe",
            email: "john@example.com",
            bio: "",
            company: "",
            location: "",
            website: "",
        },
    });

    const onSubmit = async (data) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        toast.success("Profile updated successfully!");
        console.log("Profile data:", data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
                <h3 className="text-lg font-medium text-white">Profile Information</h3>
                <p className="text-sm text-[#8b949e] mt-1">
                    Update your personal information and public profile
                </p>
            </div>

            <div className="space-y-4">
                {/* Name */}
                <div>
                    <label className="block text-sm text-[#8b949e] mb-1.5">
                        Display Name
                    </label>
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8b949e]" />
                        <input
                            {...register("name")}
                            className="w-full h-10 pl-10 pr-4 bg-[#0d1117] border border-[#30363d] rounded-md text-sm text-white focus:outline-none focus:border-[#1f6feb] focus:ring-1 focus:ring-[#1f6feb]/20"
                            placeholder="Your name"
                        />
                    </div>
                    {errors.name && (
                        <p className="text-xs text-red-400 mt-1">{errors.name.message}</p>
                    )}
                </div>

                {/* Email */}
                <div>
                    <label className="block text-sm text-[#8b949e] mb-1.5">
                        Email Address
                    </label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8b949e]" />
                        <input
                            {...register("email")}
                            type="email"
                            className="w-full h-10 pl-10 pr-4 bg-[#0d1117] border border-[#30363d] rounded-md text-sm text-white focus:outline-none focus:border-[#1f6feb] focus:ring-1 focus:ring-[#1f6feb]/20"
                            placeholder="you@example.com"
                        />
                    </div>
                    {errors.email && (
                        <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>
                    )}
                </div>

                {/* Bio */}
                <div>
                    <label className="block text-sm text-[#8b949e] mb-1.5">
                        Bio
                    </label>
                    <div className="relative">
                        <FileText className="absolute left-3 top-3 h-4 w-4 text-[#8b949e]" />
                        <textarea
                            {...register("bio")}
                            rows={3}
                            className="w-full pl-10 pr-4 py-2 bg-[#0d1117] border border-[#30363d] rounded-md text-sm text-white focus:outline-none focus:border-[#1f6feb] focus:ring-1 focus:ring-[#1f6feb]/20 resize-none"
                            placeholder="Tell us about yourself"
                        />
                    </div>
                    {errors.bio && (
                        <p className="text-xs text-red-400 mt-1">{errors.bio.message}</p>
                    )}
                </div>

                {/* Company & Location */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm text-[#8b949e] mb-1.5">
                            Company
                        </label>
                        <div className="relative">
                            <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8b949e]" />
                            <input
                                {...register("company")}
                                className="w-full h-10 pl-10 pr-4 bg-[#0d1117] border border-[#30363d] rounded-md text-sm text-white focus:outline-none focus:border-[#1f6feb] focus:ring-1 focus:ring-[#1f6feb]/20"
                                placeholder="Company name"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm text-[#8b949e] mb-1.5">
                            Location
                        </label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8b949e]" />
                            <input
                                {...register("location")}
                                className="w-full h-10 pl-10 pr-4 bg-[#0d1117] border border-[#30363d] rounded-md text-sm text-white focus:outline-none focus:border-[#1f6feb] focus:ring-1 focus:ring-[#1f6feb]/20"
                                placeholder="City, Country"
                            />
                        </div>
                    </div>
                </div>

                {/* Website */}
                <div>
                    <label className="block text-sm text-[#8b949e] mb-1.5">
                        Website
                    </label>
                    <div className="relative">
                        <Link className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8b949e]" />
                        <input
                            {...register("website")}
                            className="w-full h-10 pl-10 pr-4 bg-[#0d1117] border border-[#30363d] rounded-md text-sm text-white focus:outline-none focus:border-[#1f6feb] focus:ring-1 focus:ring-[#1f6feb]/20"
                            placeholder="https://yourwebsite.com"
                        />
                    </div>
                    {errors.website && (
                        <p className="text-xs text-red-400 mt-1">{errors.website.message}</p>
                    )}
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
                    Cancel
                </Button>
            </div>
        </form>
    );
}
