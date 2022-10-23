import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { ThemeEntity } from './../../themes/entities/theme.entity';
import { CourseMemberEntity } from './course-member.entity';
import { CourseRoleEntity } from './course-role.entity';

@Entity({
    name: 'courses',
})
export class CourseEntity {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column({ length: 50 })
    public title: string;

    @Column({ length: 255, nullable: true })
    public description: string;

    @CreateDateColumn()
    public createdAt: Date;

    @UpdateDateColumn()
    public updatedAt: Date;

    @DeleteDateColumn()
    public deletedAt: Date;

    @ManyToOne(() => ThemeEntity, (theme) => theme.courses)
    public theme: ThemeEntity;

    @OneToMany(() => CourseMemberEntity, (member) => member.course)
    public members: CourseMemberEntity[];

    @OneToMany(() => CourseRoleEntity, (role) => role.course, { nullable: true })
    public roles: CourseRoleEntity[];
}
