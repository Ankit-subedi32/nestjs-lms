import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/registerUser.dto';

@Injectable()
export class AuthService {
    constructor(private readonly userService : UserService){}
    registerUser(registerUserDto: RegisterDto ){
        console.log("registerDto",registerUserDto);
        //Logic for user register
        /**
         * 1. Check if email already exists
         * 2.has the password
         * 3. store the user into db
         * 4. generate jwt token 
         * 5. send token in response 
         */
        return this.userService.createUser();
    }
}
