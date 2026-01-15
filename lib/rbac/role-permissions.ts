import { Permission } from "./permissions";
import { Role } from "./roles";

export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
    [Role.ADMIN]: Object.values(Permission),

    [Role.SELLER]: [
        Permission.VIEW_PROPERTIES,
        Permission.MANAGE_PROPERTIES,
        Permission.MANAGE_APPOINTMENTS,
        Permission.VIEW_PROFILE,
        Permission.MANAGE_SETTINGS,
        Permission.VIEW_DASHBOARD,
    ],

    [Role.BUYER]: [
        Permission.VIEW_PROPERTIES,
        Permission.VIEW_FAVORITES,
        Permission.MANAGE_APPOINTMENTS,
        Permission.VIEW_PROFILE,
        Permission.MANAGE_SETTINGS,
        Permission.VIEW_DASHBOARD,
    ],
};