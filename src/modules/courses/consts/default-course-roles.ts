import { CourseRoleDTO } from './../dto/course-role.dto';
import {
    DEFAULT_ADMIN_COURSE_PERMISSIONS,
    DEFAULT_MEMBER_COURSE_PERMISSIONS,
} from './default-course-permissions';

export const DEFAULT_COURSE_ROLES: CourseRoleDTO[] = [
    {
        name: 'admin',
        permissions: DEFAULT_ADMIN_COURSE_PERMISSIONS,
    },
    {
        name: 'member',
        permissions: DEFAULT_MEMBER_COURSE_PERMISSIONS,
    },
];
