import { CourseMemberEntity } from '@modules/courses/entities';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { omit } from 'lodash';
import { paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { In, Repository } from 'typeorm';
import { ThemeEntity } from './../themes/entities/theme.entity';
import { ThemesService } from './../themes/themes.service';
import { UserEntity } from './../users/entities/user.entity';
import { UsersService } from './../users/users.service';
import { GET_COURSES_PAGINATE_CONFIG, GET_COURSE_MEMBERS_PAGINATE_CONFIG } from './consts';
import { CourseDTO } from './dto';
import { CourseMemberDTO } from './dto/course-member.dto';
import { CourseRoleDTO } from './dto/course-role.dto';
import { CourseEntity } from './entities';
import { CoursePermissionEntity } from './entities/course-permission.entity';
import { CourseRoleEntity } from './entities/course-role.entity';

// TODO:refactoring
@Injectable()
export class CoursesService {
    constructor(
        private readonly usersService: UsersService,
        private readonly themesService: ThemesService,
        @InjectRepository(CourseEntity)
        private readonly repository: Repository<CourseEntity>,
        @InjectRepository(CourseMemberEntity)
        private readonly membersRepository: Repository<CourseMemberEntity>,
        @InjectRepository(CourseRoleEntity)
        private readonly rolesRepository: Repository<CourseRoleEntity>,
        @InjectRepository(CoursePermissionEntity)
        private readonly permissionsRepository: Repository<CoursePermissionEntity>,
    ) {}

    public async getCourses(query: PaginateQuery): Promise<Paginated<CourseEntity>> {
        return paginate(query, this.repository, GET_COURSES_PAGINATE_CONFIG);
    }

    public async getCourseById(courseId: string): Promise<CourseEntity> {
        const course = await this.repository.findOne({
            where: { id: courseId },
            relations: {
                roles: true,
                members: true,
                theme: true,
            },
        });

        if (!course) {
            throw new NotFoundException();
        }

        return course;
    }

    // TODO
    public async createCourse(courseDto: CourseDTO): Promise<CourseEntity> {
        let theme: ThemeEntity;
        let members: UserEntity[];

        if (courseDto.theme) {
            theme = await this.themesService.getThemeById(courseDto.theme);
        }

        if (courseDto.members?.length) {
            members = await this.usersService.getUsersByIds(courseDto.members);
        }

        const course = await this.repository.save(
            this.repository.create({ ...courseDto, theme, members }),
        );

        const permissions = await this.permissionsRepository.find();

        const admin = this.rolesRepository.create({ title: 'admin', course, permissions });
        const member = this.rolesRepository.create({ title: 'member', course });

        const roles = await Promise.all([
            this.rolesRepository.save(admin),
            this.rolesRepository.save(member),
        ]);

        return { ...course, roles };
    }

    public async updateCourse(courseId: string, courseDto: CourseDTO): Promise<CourseEntity> {
        await this.repository.update(courseId, omit(courseDto, 'theme'));

        return await this.repository.findOneBy({ id: courseId });
    }

    public async createCourseRole(
        courseId: string,
        courseRoleDto: CourseRoleDTO,
    ): Promise<CourseRoleEntity> {
        let permissions: CoursePermissionEntity[];

        if (courseRoleDto.permissions) {
            permissions = await this.permissionsRepository.findBy({
                id: In(courseRoleDto.permissions),
            });
        }

        const course = await this.repository.findOneBy({ id: courseId });

        const role = this.rolesRepository.create({ ...courseRoleDto, course, permissions });

        return await this.rolesRepository.save(role);
    }

    public async getCourseMembers(query: PaginateQuery): Promise<Paginated<CourseMemberEntity>> {
        return paginate(query, this.membersRepository, GET_COURSE_MEMBERS_PAGINATE_CONFIG);
    }

    public async createCourseMember(
        courseId: string,
        memberDto: CourseMemberDTO,
    ): Promise<CourseMemberEntity> {
        const { roleId, userId } = memberDto;

        const course = await this.getCourseById(courseId);
        const role = await this.rolesRepository.findOneBy({ id: roleId });
        const user = await this.usersService.getUserById(userId);

        console.log(user);

        const member = this.membersRepository.create({ course, user, role });

        return await this.membersRepository.save(member);
    }
}
