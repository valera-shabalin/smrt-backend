import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { CourseEntity } from './../../courses/entities/course.entity';

@Entity({
    name: 'themes',
})
export class ThemeEntity {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column({ length: 50 })
    public title: string;

    @Column({ length: 255, nullable: true })
    public description: string;

    @CreateDateColumn()
    public createdAt: string;

    @UpdateDateColumn()
    public updatedAt: string;

    @DeleteDateColumn()
    public deletedAt: string;

    @OneToMany(() => CourseEntity, (course) => course.theme)
    public courses: CourseEntity[];
}
