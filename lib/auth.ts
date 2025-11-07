import { User, AuthState } from "@/types";

const HARDCODED_EMAIL = "admin@test.com";
const HARDCODED_PASSWORD = "admin123";

export const AUTH_STORAGE_KEY = "auth_state";

export function validateCredentials(email: string, password: string): boolean {
  return email === HARDCODED_EMAIL && password === HARDCODED_PASSWORD;
}

export function login(email: string, password: string): AuthState | null {
  if (validateCredentials(email, password)) {
    const authState: AuthState = {
      isAuthenticated: true,
      user: {
        email: email,
        name: "Admin User",
      },
    };
    
    // Store in localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authState));
    }
    
    return authState;
  }
  return null;
}

export function logout(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }
}

// Alias for logout
export const signOut = logout;

export function getAuthState(): AuthState {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return { isAuthenticated: false, user: null };
      }
    }
  }
  return { isAuthenticated: false, user: null };
}

export function isAuthenticated(): boolean {
  return getAuthState().isAuthenticated;
}

