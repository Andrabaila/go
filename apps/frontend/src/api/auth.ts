import axios from 'axios';
import type {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
} from '@shared/types/auth';

const API_URL = 'http://localhost:3000/auth';

export async function registerUser(data: RegisterRequest) {
  await axios.post(`${API_URL}/register`, data);
}

export async function loginUser(data: LoginRequest): Promise<AuthResponse> {
  const res = await axios.post<AuthResponse>(`${API_URL}/login`, data);
  localStorage.setItem('token', res.data.access_token);
  return res.data;
}
