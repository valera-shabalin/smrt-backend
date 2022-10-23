import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CourseDTO {
    @ApiProperty({
        minimum: 3,
        maximum: 50,
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(50)
    public title: string;

    @ApiProperty({
        maximum: 255,
    })
    @IsString()
    @MaxLength(255)
    public description: string;

    @ApiProperty()
    @IsString()
    public theme?: string;

    @ApiProperty()
    @IsArray()
    public members?: string[];
}
