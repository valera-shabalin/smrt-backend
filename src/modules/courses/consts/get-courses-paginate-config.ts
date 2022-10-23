import { FilterOperator, PaginateConfig } from 'nestjs-paginate';
import { CourseEntity } from './../entities/course.entity';

export const GET_COURSES_PAGINATE_CONFIG: PaginateConfig<CourseEntity> = {
    sortableColumns: ['id'],
    relations: ['theme'],
    filterableColumns: {
        'theme.id': [FilterOperator.IN],
        'members.id': [FilterOperator.IN],
    },
};
