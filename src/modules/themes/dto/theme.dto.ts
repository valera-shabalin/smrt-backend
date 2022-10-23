import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class ThemeDTO {
    @ApiProperty({
        required: true,
        minimum: 3,
        maximum: 50,
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(50)
    public title: string;

    @ApiProperty({
        required: false,
        maximum: 255,
    })
    @ApiProperty()
    @IsString()
    @MaxLength(255)
    public description: string;
}
