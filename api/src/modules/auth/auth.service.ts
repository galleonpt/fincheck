import {
    ConflictException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';

import { UsersRepository } from 'src/shared/database/repositories/users.repository';
import { AuthenticateDto } from './dto/authenticate.dto';
import { SignUpDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersRepository: UsersRepository,
        private readonly jwtService: JwtService,
    ) {}

    async signin({ email, password }: AuthenticateDto) {
        const user = await this.usersRepository.findUnique({
            where: { email },
        });

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordValid = await compare(password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { sub: user.id };
        const accessToken = await this.jwtService.signAsync(payload);

        return {
            accessToken,
        };
    }

    async signup({ name, email, password }: SignUpDto) {
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
