import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThemesModule } from './../themes/themes.module';
import { UsersModule } from './../users/users.module';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { CourseEntity } from './entities';
import { CourseMemberEntity } from './entities/course-member.entity';
import { CoursePermissionEntity } from './entities/course-permission.entity';
import { CourseRoleEntity } from './entities/course-role.entity';

const COURSE_ENTITIES = [
    CourseEntity,
    CourseMemberEntity,
    CourseRoleEntity,
    CoursePermissionEntity,
];

@Module({
    imports: [ThemesModule, UsersModule, TypeOrmModule.forFeature(COURSE_ENTITIES)],
    controllers: [CoursesController],
    providers: [CoursesService],
    exports: [CoursesService],
})
export class CoursesModule {}
