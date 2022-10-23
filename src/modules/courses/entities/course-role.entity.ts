import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { CourseMemberEntity } from '.';
import { CoursePermissionEntity } from './course-permission.entity';
import { CourseEntity } from './course.entity';

@Entity({
    name: 'course_roles',
})
export class CourseRoleEntity {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column()
    public title: string;

    @OneToMany(() => CourseMemberEntity, (member) => member.role, { nullable: true })
    public members: CourseMemberEntity[];

    @ManyToOne(() => CourseEntity, (course) => course.roles)
    public course: CourseEntity;

    @ManyToMany(() => CoursePermissionEntity, (permission) => permission.roles, { nullable: true })
    @JoinTable()
    public permissions: CoursePermissionEntity[];
}
