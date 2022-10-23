import { UserEntity } from '@modules/users/entities/user.entity';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserDTO } from './../users/dto/user.dto';
import { AuthService } from './auth.service';
import { Token } from './interfaces/token.interface';

@Controller('auth')
@ApiTags('Auth controller')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('sign-up')
    @ApiCreatedResponse({
        type: UserEntity,
        description: 'User successfully signed up',
    })
    public async signUp(@Body() userDto: UserDTO): Promise<Token> {
        return this.authService.signUp(userDto);
    }

    @Post('sign-in')
    @ApiOkResponse({
        type: UserEntity,
        description: 'User successfully signed ip',
    })
    public async signIn(@Body() userDto: UserDTO): Promise<Token> {
        return this.authService.signIn(userDto);
    }

    @Post('sign-out')
    @ApiOkResponse({
        type: null,
        description: 'User successfully signed out',
    })
    public async signOut(): Promise<null> {
        return this.authService.signOut();
    }
}
