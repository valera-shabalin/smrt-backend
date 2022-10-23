import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CourseRoleDTO {
    @ApiProperty({
        minimum: 3,
        maximum: 50,
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(50)
    public name: string;

    @ApiProperty({
        maximum: 255,
    })
    @IsString()
    @MaxLength(255)
    public description?: string;

    @ApiProperty()
    @IsArray()
    public permissions?: string[];
}
