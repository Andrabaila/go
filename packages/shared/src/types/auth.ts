export interface AuthResponse {
  access_token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

// Runtime values for compilation
export const AuthResponseSchema = { access_token: 'string' } as const;
export const LoginRequestSchema = {
  email: 'string',
  password: 'string',
} as const;
export const RegisterRequestSchema = {
  email: 'string',
  password: 'string',
} as const;
