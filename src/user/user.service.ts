import { ConflictException, Injectable } from '@nestjs/common';
import { RegisterDto } from 'src/auth/dto/registerUser.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private readonly prisma:PrismaService){    }
    async createUser(registerUserDto: RegisterDto){
    try {
        return   await this.prisma.user.create({
            data:{
            fname: registerUserDto.fname,
            lname: registerUserDto.lname,
            email: registerUserDto.email,
            password: registerUserDto.password,
            },
         });
    }
    catch(err){
        const DUPLICATE_KY_CODE = 'P2002';
          if(err.code == DUPLICATE_KY_CODE ){
        throw new ConflictException("Email is already taken")
    }
    throw err; 

    }
    
    }
}
