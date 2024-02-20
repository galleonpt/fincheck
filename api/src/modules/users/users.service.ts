import { ConflictException, Injectable } from '@nestjs/common';
import { hash } from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from 'src/shared/database/repositories/users.repository';

@Injectable()
export class UsersService {
    constructor(private readonly usersRepository: UsersRepository) {}

    async create(createUserDto: CreateUserDto) {
        const { name, email, password } = createUserDto;

        const emailAlreadyInUse = await this.usersRepository.findUnique({
            where: { email },
            select: { id: true },
        });

        if (emailAlreadyInUse) {
            throw new ConflictException('This email is already in use.');
        }

        const hashedPw = await hash(password, 12);

        const user = await this.usersRepository.create({
            data: {
                name,
                email,
                password: hashedPw,
                categories: {
                    createMany: {
                        data: [
                            // Income
                            {
                                name: 'Salary',
                                icon: 'salary',
                                type: 'INCOME',
                            },
                            {
                                name: 'Freelance',
                                icon: 'freelance',
                                type: 'INCOME',
                            },
                            {
                                name: 'Other',
                                icon: 'other',
                                type: 'INCOME',
                            },
                            // Expense
                            { name: 'Home', icon: 'home', type: 'EXPENSE' },
                            {
                                name: 'Food',
                                icon: 'food',
                                type: 'EXPENSE',
                            },
                            {
                                name: 'Education',
                                icon: 'education',
                                type: 'EXPENSE',
                            },
                            { name: 'Fun', icon: 'fun', type: 'EXPENSE' },
                            {
                                name: 'Grocery',
                                icon: 'grocery',
                                type: 'EXPENSE',
                            },
                            {
                                name: 'Clothes',
                                icon: 'clothes',
                                type: 'EXPENSE',
                            },
                            {
                                name: 'Transport',
                                icon: 'transport',
                                type: 'EXPENSE',
                            },
                            {
                                name: 'Travel',
                                icon: 'travel',
                                type: 'EXPENSE',
                            },
                            {
                                name: 'Other',
                                icon: 'other',
                                type: 'EXPENSE',
                            },
                        ],
                    },
                },
            },
        });

        return { name: user.name, email: user.email };
    }
}
