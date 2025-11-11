import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService, type UserEntity } from '../users/users.service.js';
import type { AuthResponse } from '@shared/types/auth.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  /**
   * Проверяет корректность логина и пароля.
   * Возвращает объект пользователя без пароля, если успешно.
   */
  async validateUser(
    email: string,
    password: string
  ): Promise<Omit<UserEntity, 'password'>> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _password, ...result } = user;
      return result;
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  /**
   * Создаёт JWT токен на основе данных пользователя.
   */
  async login(user: Omit<UserEntity, 'password'>): Promise<AuthResponse> {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  /**
   * Регистрирует нового пользователя с хэшированием пароля.
   */
  async register(email: string, password: string): Promise<UserEntity> {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.usersService.create({ email, password: hashedPassword });
  }
}
