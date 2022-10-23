import { UserEntity } from '@modules/users/entities/user.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CourseRoleEntity } from './course-role.entity';
import { CourseEntity } from './course.entity';

@Entity({
    name: 'course_members',
})
export class CourseMemberEntity {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @ManyToOne(() => UserEntity, (user) => user.courses)
    public user: UserEntity;

    @ManyToOne(() => CourseEntity, (course) => course.members)
    public course: CourseEntity;

    @ManyToOne(() => CourseRoleEntity, (role) => role.members)
    public role: CourseRoleEntity;
}
