import { CourseMemberEntity } from '@modules/courses/entities';
import { PaginateConfig } from 'nestjs-paginate';

export const GET_COURSE_MEMBERS_PAGINATE_CONFIG: PaginateConfig<CourseMemberEntity> = {
    sortableColumns: ['id'],
    relations: ['user', 'role'],
};
