import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/registerUser.dto';
import  bcrypt from "bcrypt";
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/loginUser.dto';

@Injectable()
export class AuthService {
    constructor(private readonly userService : UserService, private readonly jwtService :JwtService){}


    async registerUser(registerUserDto: RegisterDto ){
        console.log("registerDto",registerUserDto);

        const saltRounds = 10;
        const hash = await bcrypt.hash(registerUserDto.password,saltRounds);
        //Logic for user register
        /**
         * 1. Check if email already exists
         * 2.has the password
         * 3. store the user into db
         * 4. generate jwt token 
         * 5. send token in response 
         */
        const user = await this.userService.createUser({...registerUserDto,password:hash });
        const payload = {sub:user.id};
        const token = await this.jwtService.signAsync(payload);
        console.log(token)
        return{access_token : token };
    }


    async loginUser(loginDto: LoginDto){
        const {email, password} = loginDto;

        const user = await this.userService.findByEmail(loginDto.email);

        if(!user){
            throw new UnauthorizedException('Invalid email or password');

        }
        const passwordValid = await bcrypt.compare(password, user.password);


        
    if(!passwordValid){
        throw new  UnauthorizedException('Invalid Email or password');

    }

    const payload = {sub:user.id, 
        email: user.email};

        return {
            access_token: await this.jwtService.signAsync(payload)
        };

    }

    
}
