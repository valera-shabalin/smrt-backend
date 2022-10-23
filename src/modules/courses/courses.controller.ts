import { CoursesService } from '@modules/courses/courses.service';
import { CourseMemberEntity } from '@modules/courses/entities';
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { CourseMemberDTO } from './dto';
import { CourseRoleDTO } from './dto/course-role.dto';
import { CourseDTO } from './dto/course.dto';
import { CourseEntity } from './entities';
import { CourseRoleEntity } from './entities/course-role.entity';

@ApiTags('Courses controller')
@Controller('courses')
export class CoursesController {
    constructor(private readonly coursesService: CoursesService) {}

    @Get()
    public async getCourses(@Paginate() query: PaginateQuery): Promise<Paginated<CourseEntity>> {
        return this.coursesService.getCourses(query);
    }

    @Get(':id')
    public async getCourseById(@Param('id') id: string): Promise<CourseEntity> {
        return this.coursesService.getCourseById(id);
    }

    @ApiBody({ type: CourseDTO })
    @Post()
    public async createCourse(@Body() courseDto: CourseDTO): Promise<CourseEntity> {
        return this.coursesService.createCourse(courseDto);
    }

    @ApiBody({ type: CourseDTO })
    @Put(':id')
    public async updateCourse(
        @Param('id') courseId: string,
        @Body() courseDto: CourseDTO,
    ): Promise<CourseEntity> {
        return this.coursesService.updateCourse(courseId, courseDto);
    }

    @ApiBody({ type: CourseRoleDTO })
    @Post(':id/role')
    public async createCourseRole(
        @Param('id') courseId: string,
        @Body() courseRoleDto: CourseRoleDTO,
    ): Promise<CourseRoleEntity> {
        return this.coursesService.createCourseRole(courseId, courseRoleDto);
    }

    @Get(':id/members')
    public async getCourseMembers(
        @Paginate() query: PaginateQuery,
    ): Promise<Paginated<CourseMemberEntity>> {
        return this.coursesService.getCourseMembers(query);
    }

    @ApiBody({ type: CourseMemberDTO })
    @Post(':id/members')
    public async createCourseMember(
        @Param('id') courseId: string,
        @Body() memberDto: CourseMemberDTO,
    ): Promise<CourseMemberEntity> {
        return this.coursesService.createCourseMember(courseId, memberDto);
    }
}
