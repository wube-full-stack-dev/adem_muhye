// Role hierarchy and permissions
export const ROLES = {
  ADMIN: "admin",
  MANAGER: "manager",
  STAFF: "staff",
};

// Role hierarchy (higher number = more privileges)
export const ROLE_HIERARCHY = {
  [ROLES.ADMIN]: 100,
  [ROLES.MANAGER]: 50,
  [ROLES.STAFF]: 10,
};

// Permission definitions
export const PERMISSIONS = {
  DELETE_SALE: "delete_sale",
  EDIT_SALE: "edit_sale",
  VIEW_USERS: "view_users",
  MANAGE_USERS: "manage_users",
  VIEW_REPORTS: "view_reports",
};

// Role-based permissions matrix
export const ROLE_PERMISSIONS = {
  [ROLES.ADMIN]: [
    PERMISSIONS.DELETE_SALE,
    PERMISSIONS.EDIT_SALE,
    PERMISSIONS.VIEW_USERS,
    PERMISSIONS.MANAGE_USERS,
    PERMISSIONS.VIEW_REPORTS,
  ],
  [ROLES.MANAGER]: [
    PERMISSIONS.EDIT_SALE,
    PERMISSIONS.VIEW_USERS,
    PERMISSIONS.VIEW_REPORTS,
  ],
  [ROLES.STAFF]: [],
};

/**
 * Get display name for role
 */
export const getRoleDisplayName = (role) => {
  const roleNames = {
    [ROLES.ADMIN]: "Administrator",
    [ROLES.MANAGER]: "Manager",
    [ROLES.STAFF]: "Staff",
  };
  return roleNames[role] || role;
};

/**
 * Get badge color for role
 */
export const getRoleBadgeColor = (role) => {
  const colors = {
    [ROLES.ADMIN]: "danger",
    [ROLES.MANAGER]: "warning",
    [ROLES.STAFF]: "info",
  };
  return colors[role] || "secondary";
};

/**
 * Check if user has a specific permission
 */
export const hasPermission = (userRole, permission) => {
  if (!userRole || !permission) return false;
  const permissions = ROLE_PERMISSIONS[userRole] || [];
  return permissions.includes(permission);
};

/**
 * Check if user role is at least minimum role
 */
export const isAtLeastRole = (userRole, minimumRole) => {
  if (!userRole || !minimumRole) return false;
  const userRoleLevel = ROLE_HIERARCHY[userRole] || 0;
  const minimumRoleLevel = ROLE_HIERARCHY[minimumRole] || 0;
  return userRoleLevel >= minimumRoleLevel;
};
