import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { UsersService, type UserEntity } from './users.service.js';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * GET /users
   * Возвращает всех пользователей без паролей
   */
  @Get()
  async findAll(): Promise<Omit<UserEntity, 'password'>[]> {
    return this.usersService.findAll();
  }

  /**
   * GET /users/:email
   * Возвращает пользователя по email без пароля
   */
  @Get(':email')
  async findByEmail(
    @Param('email') email: string
  ): Promise<Omit<UserEntity, 'password'>> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    // Явное перечисление полей без пароля
    return {
      id: user.id,
      email: user.email,
    };
  }
}
