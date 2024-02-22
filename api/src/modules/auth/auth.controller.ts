import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signin.dto';
import { SignUpDto } from './dto/signup.dto';
import { IsPublic } from 'src/shared/decorators/isPublic';

@IsPublic()
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signin')
    signin(@Body() authenticateData: SigninDto) {
        return this.authService.signin(authenticateData);
    }

    @Post('signup')
    signup(@Body() signupData: SignUpDto) {
        return this.authService.signup(signupData);
    }
}
