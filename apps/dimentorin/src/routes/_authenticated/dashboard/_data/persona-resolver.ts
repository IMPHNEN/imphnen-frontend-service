import type { TUserItem } from '@imphnen-frontend-service/service';

/**
 * Persona type for dashboard rendering.
 */
export type Persona = 'user' | 'mentor';

/**
 * Resolves the persona for the dashboard based on authentication and query parameters.
 *
 * Resolution priority:
 * 1. Query parameter `?persona=user|mentor` (explicit override)
 * 2. User role name contains 'mentor' (case-insensitive)
 * 3. Fallback to 'user' persona
 *
 * @param user - The authenticated user object
 * @param searchParams - URL search parameters
 * @returns The resolved persona
 */
export function resolvePersona(
  user: TUserItem | undefined,
  searchParams?: URLSearchParams
): Persona {
  // Check for explicit persona query parameter
  if (searchParams) {
    const param = searchParams.get('persona');
    if (param === 'mentor' || param === 'user') {
      return param;
    }
  }

  // Derive from user role name
  if (user?.role?.name) {
    const roleName = user.role.name.toLocaleLowerCase();
    if (roleName.includes('mentor')) {
      return 'mentor';
    }
  }

  // Default to user persona
  return 'user';
}

/**
 * Parses search parameters from a URL search string.
 * Utility for testing and usage without URLSearchParams API.
 *
 * @param search - URL search string (e.g., "?persona=mentor")
 * @returns URLSearchParams instance
 */
export function parseSearchParams(search: string): URLSearchParams {
  return new URLSearchParams(search);
}
