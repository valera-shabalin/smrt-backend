import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { UserDTO } from './dto';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';

@ApiTags('Users controller')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    @UseGuards(JwtAuthGuard)
    public async getUsers(@Paginate() query: PaginateQuery): Promise<Paginated<UserEntity>> {
        return this.usersService.getUsers(query);
    }

    @Get(':id')
    @ApiOkResponse({
        type: UserEntity,
    })
    @UseGuards(JwtAuthGuard)
    public async getUserById(@Param('id') userId: string): Promise<UserEntity> {
        return this.usersService.getUserById(userId);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    public async createUser(@Body() userDto: UserDTO): Promise<UserEntity> {
        return this.usersService.createUser(userDto);
    }
}
