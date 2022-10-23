import { IsNotEmpty, IsString } from 'class-validator';

export class CourseMemberDTO {
    @IsString()
    @IsNotEmpty()
    public roleId: string;

    @IsString()
    @IsNotEmpty()
    public userId: string;
}
