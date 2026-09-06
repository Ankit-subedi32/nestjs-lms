import { Body, Controller, Post} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/registerUser.dto';

@Controller('auth')   //    /auth/register
export class AuthController {
    authService:AuthService;
    constructor(authServices:AuthService){
        this.authService = authServices;
    }
     
    @Post('register')
    register(@Body()registerUserDto:RegisterDto){

        const result = this.authService.registerUser(registerUserDto);
        return result;
    }
}
