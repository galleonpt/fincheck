import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthenticateDto } from './dto/authenticate.dto';
import { SignUpDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signin')
    signin(@Body() authenticateData: AuthenticateDto) {
        return this.authService.signin(authenticateData);
    }

    @Post('signup')
    signup(@Body() signupData: SignUpDto) {
        return this.authService.signup(signupData);
    }
}
