import { UserEntity } from '@modules/users/entities/user.entity';
import { UsersService } from '@modules/users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { omit } from 'lodash';
import { UserDTO } from './../users/dto/user.dto';
import { Token } from './interfaces/token.interface';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly usersService: UsersService,
    ) {}

    public async signUp(userDto: UserDTO): Promise<Token> {
        const user = await this.usersService.createUser(userDto);

        return {
            accessToken: this.jwtService.sign(user),
        };
    }

    public async signIn(userDto: UserDTO): Promise<Token> {
        const user = await this.validateUser(userDto);

        return {
            accessToken: this.jwtService.sign(user),
        };
    }

    public async signOut(): Promise<null> {
        return null;
    }

    private async validateUser({
        email,
        password,
    }: UserDTO): Promise<UserEntity | UnauthorizedException> {
        const user = await this.usersService.getUserByEmail(email);

        if (user.password === password) {
            return omit(user, 'password');
        }

        return new UnauthorizedException();
    }
}
