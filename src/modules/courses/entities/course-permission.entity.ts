import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CourseRoleEntity } from './course-role.entity';

@Entity({
    name: 'course_permission',
})
export class CoursePermissionEntity {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column({ length: 50 })
    public name: string;

    @Column({ length: 255, nullable: true })
    public description?: string;

    @ManyToMany(() => CourseRoleEntity, (role) => role.permissions, { nullable: true })
    public roles?: CourseRoleEntity[];
}
