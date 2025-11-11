import { Injectable } from '@nestjs/common';

/**
 * Тип пользователя
 */
export interface UserEntity {
  id: number;
  email: string;
  password: string;
}

@Injectable()
export class UsersService {
  // Пока что храним пользователей в памяти
  private users: UserEntity[] = [];

  /**
   * Найти пользователя по email
   */
  async findByEmail(email: string): Promise<UserEntity | undefined> {
    return this.users.find((u) => u.email === email);
  }

  /**
   * Создать нового пользователя
   */
  async create(user: Omit<UserEntity, 'id'>): Promise<UserEntity> {
    const newUser: UserEntity = {
      id: Date.now(), // простая генерация ID
      ...user,
    };
    this.users.push(newUser);
    return newUser;
  }

  /**
   * Вернуть всех пользователей (для отладки)
   */
  async findAll(): Promise<Omit<UserEntity, 'password'>[]> {
    return this.users.map((user) => ({
      id: user.id,
      email: user.email,
    }));
  }
}
