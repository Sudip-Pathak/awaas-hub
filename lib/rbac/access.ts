import { Role } from "./roles";
import { Permission } from "./permissions";
import { ROLE_PERMISSIONS } from "./role-permissions";

/**
 * Checks if a role has a given permission
 */
export function hasPermission(
    role: Role,
    permission: Permission
): boolean {
    return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}

/**
 * Checks if a role has ALL permissions
 */
export function hasAllPermissions(
    role: Role,
    permissions: Permission[]
): boolean {
    return permissions.every((p) => hasPermission(role, p));
}

/**
 * Checks if a role has ANY permission
 */
export function hasAnyPermission(
    role: Role,
    permissions: Permission[]
): boolean {
    return permissions.some((p) => hasPermission(role, p));
}
