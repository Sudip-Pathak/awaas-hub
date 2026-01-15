"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { getSession } from "@/lib/auth-client"; // your session helper

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useUpdateRole } from "@/hooks/services/useUpdateRole";

export default function UpdateProfile() {
    const router = useRouter();
    const [role, setRole] = useState<string>("");
    const [userId, setUserId] = useState<string | null>(null);
    const mutation = useUpdateRole();

    // Fetch session on mount
    useEffect(() => {
        async function fetchSession() {
            const { data: session } = await getSession();
            console.log(session)
            if (!session?.user?.id) {
                toast.error("User not logged in");
                router.push("/login");
                return;
            }
            setUserId(session.user.id);
        }
        fetchSession();
    }, [router]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!role) {
            toast.error("Please select a role");
            return;
        }

        if (!userId) {
            toast.error("User not found");
            return;
        }

        mutation.mutate(
            { userId, role },
            {
                onSuccess: () => {
                    toast.success("Role updated successfully!");
                    router.push("/dashboard");
                },
                onError: (err: any) => {
                    toast.error(err.message || "Failed to update role");
                },
            }
        );
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md space-y-6 rounded-xl border bg-card p-6 shadow-md"
            >
                <h2 className="text-2xl font-bold text-center">Select Your Role</h2>
                <p className="text-center text-muted-foreground">
                    Choose your account type
                </p>

                <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select value={role} onValueChange={setRole}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="buyer">Buyer</SelectItem>
                            <SelectItem value="seller">Seller</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <Button type="submit" className="w-full" disabled={mutation.isPending || !userId}>
                    {mutation.isPending ? "Submitting..." : "Submit"}
                </Button>
            </form>
        </div>
    );
}
