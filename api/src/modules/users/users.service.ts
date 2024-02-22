import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UsersRepository } from 'src/shared/database/repositories/users.repository';

@Injectable()
export class UsersService {
    constructor(private readonly usersRepository: UsersRepository) {}

    async getUserById(userId: string): Promise<Pick<User, 'name' | 'email'>> {
        return this.usersRepository.findUnique({
            where: {
                id: userId,
            },
            select: {
                name: true,
                email: true,
            },
        });
    }
}
