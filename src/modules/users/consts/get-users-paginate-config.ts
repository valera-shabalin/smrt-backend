import { UserEntity } from '@modules/users/entities/user.entity';
import { FilterOperator, PaginateConfig } from 'nestjs-paginate';

export const GET_USERS_PAGINATE_CONFIG: PaginateConfig<UserEntity> = {
    sortableColumns: ['id'],
    relations: ['courses'],
    filterableColumns: {
        'courses.id': [FilterOperator.IN],
    },
};
