import { CourseMemberEntity } from '@modules/courses/entities';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
    name: 'users',
})
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column()
    public email: string;

    @Column()
    public password?: string;

    @Column({ nullable: true })
    public firstName: string;

    @Column({ nullable: true })
    public lastName: string;

    @OneToMany(() => CourseMemberEntity, (member) => member.user)
    public courses: CourseMemberEntity[];
}
