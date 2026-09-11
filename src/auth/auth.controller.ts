import { Body, Controller, Post} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/registerUser.dto';
import { LoginDto } from './dto/loginUser.dto';

@Controller('auth')   //    /auth/register
export class AuthController {
    authService:AuthService;
    constructor(authServices:AuthService){
        this.authService = authServices;
    }
     
    @Post('register')
   async register(@Body()registerUserDto:RegisterDto){

        const token =await this.authService.registerUser(registerUserDto);
        return token;
    }

    @Post('login')
    async login(@Body() loginDto: LoginDto){
        return this.authService.loginUser(loginDto);
         
    }
}
