import { useMutation } from "@tanstack/react-query";

type UpdateRolePayload = {
    userId: string;
    role: string;
};

export function useUpdateRole() {
    return useMutation({
        mutationFn: async (data: UpdateRolePayload) => {
            const res = await fetch("/api/auth/update-role", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.message || "Failed to update role");
            }

            return res.json();
        },
    });
}
