import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { omit } from 'lodash';
import { paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { In, Repository } from 'typeorm';
import { GET_USERS_PAGINATE_CONFIG } from './consts';
import { UserDTO } from './dto/user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly repository: Repository<UserEntity>,
    ) {}

    public async getUsers(query: PaginateQuery): Promise<Paginated<UserEntity>> {
        return paginate(query, this.repository, GET_USERS_PAGINATE_CONFIG);
    }

    public async getUserById(userId: string): Promise<UserEntity> {
        const user = await this.repository.findOneBy({ id: userId });

        if (!user) {
            throw new NotFoundException();
        }

        return omit(user, 'password');
    }

    public async getUsersByIds(ids: string[]): Promise<UserEntity[]> {
        const users = await this.repository.findBy({ id: In(ids) });

        return users.filter((user) => omit(user, 'password')); // TODO
    }

    public async getUserByEmail(email: string): Promise<UserEntity> {
        const user = this.repository.findOneBy({ email });

        if (!user) {
            throw new NotFoundException();
        }

        return user;
    }

    public async createUser(userDto: UserDTO): Promise<UserEntity> {
        const existingUser = await this.repository.findOneBy({ email: userDto.email });

        if (existingUser) {
            throw new ConflictException();
        }

        const user = await this.repository.save(this.repository.create(userDto));

        return omit(user, 'password');
    }
}
